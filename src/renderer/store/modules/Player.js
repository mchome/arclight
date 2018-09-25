import mpv from '../../mpv'

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
  fileName: '',
  isDisplayStat: false
}

const mutations = {
  LOAD_PLAYER_NODE (state, playerNode) {
    state.playerNode = playerNode
  },
  PLAYER_READY (state, isReady) {
    state.playerReady = isReady
  },
  LOAD_FILES (state, files) {
    state.order = 0
    state.currentFileList = files
  },
  SET_VOLUME (state, volume) {
    state.volume = volume
  },
  TOGGLE_PLAY (state, value) {
    state.isPlaying = (value != null) ? value : !state.isPlaying
  },
  GO_PREVIOUS (state) {
    state.order === 0
      ? state.order = state.currentFileList.length - 1
      : state.order -= 1
  },
  GO_NEXT (state) {
    state.order === state.currentFileList.length - 1
      ? state.order = 0
      : state.order += 1
  },
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
  },
  TOGGLE_STAT (state, isDisplay) {
    state.isDisplayStat = (isDisplay != null) ? isDisplay : !state.isDisplayStat
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
        } else if (name === 'pause') {
          commit('TOGGLE_PLAY', !value)
        } else if (name === 'volume') {
          commit('SET_VOLUME', value)
        } else if (name === 'time-pos' && !state.isSeeking) {
          commit('SET_SEEK', value)
        } else if (name === 'eof-reached' && value) {
          commit('GO_NEXT')
          mpv.loadFile(state.playerNode, state.currentFileList[state.order])
          if (state.order !== 0) {
            mpv.goPlay(state.playerNode, true)
          }
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
      mpv.goPlay(state.playerNode, false)
      mpv.stop(state.playerNode)
      commit('TOGGLE_PLAY', false)
      commit('LOAD_FILES', files)
      mpv.loadFile(state.playerNode, state.currentFileList[state.order])
    }
  },
  setVolume (_, volume) {
    if (state.playerNode != null && state.playerReady) {
      mpv.setVolume(state.playerNode, volume)
    }
  },
  togglePlay () {
    if (state.playerNode != null && state.playerReady && state.currentFileList.length) {
      mpv.goPlay(state.playerNode, !state.isPlaying)
    }
  },
  stop ({ commit }) {
    if (state.playerNode != null && state.playerReady) {
      mpv.goPlay(state.playerNode, false)
      mpv.seek(state.playerNode, 0)
      commit('TOGGLE_PLAY', false)
    }
  },
  seek ({ commit }, seconds) {
    commit('SET_SEEK', seconds)
    mpv.seek(state.playerNode, seconds)
  },
  seeking ({ commit }, isSeeking) {
    if (isSeeking) {
      mpv.goPlay(state.playerNode, false)
    } else {
      mpv.goPlay(state.playerNode, true)
    }
    commit('SET_SEEKING', isSeeking)
  },
  goPrevious ({ commit }) {
    commit('GO_PREVIOUS')
    mpv.loadFile(state.playerNode, state.currentFileList[state.order])
  },
  goNext ({ commit }) {
    commit('GO_NEXT')
    mpv.loadFile(state.playerNode, state.currentFileList[state.order])
  },
  goBackward () {
    mpv.seek(state.playerNode, state.seek - 5)
  },
  goForward () {
    mpv.seek(state.playerNode, state.seek + 5)
  },
  toggleMute ({ commit }) {
    if (state.playerNode != null) {
      state.isMute ? mpv.unmute(state.playerNode) : mpv.mute(state.playerNode)
      commit('TOGGLE_MUTE')
    }
  },
  getScreenshot () {
    // mpv.screenshot(state.playerNode, false)
  },
  toggleStat ({ commit }) {
    mpv.stat(state.playerNode)
    commit('TOGGLE_STAT')
  }
}

export default {
  state,
  mutations,
  actions
}
