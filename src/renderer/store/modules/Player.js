const state = {
  playerNode: null,
  playerReady: false,
  order: 0,
  currentFileList: [],
  isPlaying: false,
  isMute: false,
  duration: 0,
  seek: 0,
  isSeeking: false,
  volume: 100,
  fileName: ''
}

const mutations = {
  LOAD_PLAYER_NODE (state, playerNode) {
    state.playerNode = playerNode
  },
  PLAYER_READY (state, isReady) {
    state.playerReady = isReady
  },
  LOAD_FILES (state, files) {
    state.currentFileList = files
  },
  SET_VOLUME (state, volume) {
    state.volume = volume
  },
  TOGGLE_PLAY (state, value) {
    state.isPlaying = (value != null) ? value : !state.isPlaying
  },
  STOP (state) {
    state.isPlaying = false
  },
  GO_BACKWARD (state) { },
  GO_FORWARD (state) { },
  GO_PREVIEW (state) { },
  GO_NEXT (state) { },
  TOGGLE_MUTE (state) {
    state.isMute = !state.isMute
  },
  SET_SEEK (state, seconds) {
    state.seek = seconds
  },
  SET_DURATION (state, duration) {
    state.duration = duration
  },
  SET_SEEKING (state, isSeeking) {
    state.isSeeking = isSeeking
  },
  SET_FILENAME (state, fileName) {
    state.fileName = fileName
  }
}

const actions = {
  loadPlayerNode ({ commit }, playerNode) {
    commit('LOAD_PLAYER_NODE', playerNode)
    commit('SET_VOLUME', '100')
    state.playerNode.addEventListener('message', (e) => {
      const { type, data } = e.data
      if (type === 'ready') {
        commit('PLAYER_READY', true)
        mpv.playerReady(state.playerNode)
      } else if (type === 'property_change') {
        const { name, value } = data
        if (name === 'duration') {
          commit('SET_DURATION', value)
        } else if (name === 'time-pos' && !state.isSeeking) {
          commit('SET_SEEK', value)
        } else if (name === 'eof-reached') {
          commit('TOGGLE_PLAY', false)
          commit('SET_SEEK', 0)
          mpv.seek(state.playerNode, 0)
        } else if (name === 'filename') {
          commit('SET_FILENAME', value)
        } else {
          print(data)
        }
      } else {
        print(e.data)
      }
    })
  },
  loadFiles ({ commit }, files) {
    if (state.playerNode != null && state.playerReady) {
      mpv.pause(state.playerNode)
      mpv.stop(state.playerNode)
      commit('STOP')
      mpv.loadFile(state.playerNode, files[0])
      commit('LOAD_FILES', files)
    }
  },
  setVolume ({ commit }, volume) {
    if (state.playerNode != null && state.playerReady) {
      mpv.setVolume(state.playerNode, volume)
      commit('SET_VOLUME', parseInt(volume))
    }
  },
  togglePlay ({ commit }) {
    if (state.playerNode != null && state.playerReady && state.currentFileList.length) {
      state.isPlaying ? mpv.pause(state.playerNode) : mpv.play(state.playerNode)
      commit('TOGGLE_PLAY')
    }
  },
  stop ({ commit }) {
    if (state.playerNode != null && state.playerReady) {
      mpv.stop(state.playerNode)
      commit('STOP')
    }
  },
  seek ({ commit }, seconds) {
    commit('SET_SEEK', seconds)
    mpv.seek(state.playerNode, seconds)
  },
  seeking ({ commit }, isSeeking) {
    if (isSeeking) {
      mpv.pause(state.playerNode)
    } else if (state.isPlaying) {
      mpv.play(state.playerNode)
    }
    commit('SET_SEEKING', isSeeking)
  },
  playPrevious ({ commit }) {
    commit('GO_PREVIOUS')
  },
  playNext ({ commit }) {
    commit('GO_NEXT')
  },
  toggleMute ({ commit }) {
    if (state.playerNode != null) {
      state.isMute ? mpv.unmute(state.playerNode) : mpv.mute(state.playerNode)
      commit('TOGGLE_MUTE')
    }
  }
}

class mpv {
  static playerReady (el) {
    const observable = ['pause', 'time-pos', 'duration', 'eof-reached', 'filename']
    observable.forEach(v => this._setObserve(el, v))
  }
  static loadFile (el, filePath) {
    this._sendCommand(el, 'loadfile', filePath)
  }
  static play (el) {
    this._sendProperty(el, 'pause', false)
  }
  static pause (el) {
    this._sendProperty(el, 'pause', true)
  }
  static stop (el) {
    this._sendCommand(el, 'stop')
  }
  static setVolume (el, volume) {
    this._sendProperty(el, 'volume', volume)
  }
  static mute (el) {
    this._sendProperty(el, 'mute', true)
  }
  static unmute (el) {
    this._sendProperty(el, 'mute', false)
  }
  static seek (el, seconds) {
    this._sendCommand(el, 'seek', seconds, 'absolute')
  }

  static _sendCommand (el, cmd, ...args) {
    args = args.map(arg => arg.toString())
    el.postMessage({
      type: 'command',
      data: [cmd].concat(args)
    })
  }
  static _sendProperty (el, name, value) {
    el.postMessage({
      type: 'set_property',
      data: { name, value }
    })
  }
  static _setObserve (el, name) {
    el.postMessage({
      type: 'observe_property',
      data: name
    })
  }
}

export default {
  state,
  mutations,
  actions
}
