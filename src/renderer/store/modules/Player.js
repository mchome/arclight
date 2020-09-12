import Mpv from '../../mpv'
import * as app from '../../lib/app'

const state = {
  playerInstance: null,
  playerReady: false,
  order: 0,
  fileList: [],
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
  LOAD_PLAYER_INSTANCE (state, element) {
    state.playerInstance = new Mpv(element)
  },
  PLAYER_READY (state, isReady) {
    state.playerReady = isReady
  },
  LOAD_FILES (state, files) {
    state.order = 0
    state.fileList = files
  },
  SET_VOLUME (state, volume) {
    state.volume = volume
  },
  TOGGLE_PLAY (state, value) {
    state.isPlaying = (value != null) ? value : !state.isPlaying
  },
  GO_PREVIOUS (state) {
    state.order === 0
      ? state.order = state.fileList.length - 1
      : state.order -= 1
  },
  GO_NEXT (state) {
    state.order === state.fileList.length - 1
      ? state.order = 0
      : state.order += 1
  },
  SET_ORDER (state, order) {
    if (order > state.fileList.length - 1) {
      state.order = state.fileList.length - 1
    } else if (order < 0) {
      state.order = 0
    } else {
      state.order = order
    }
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
  loadPlayer ({ commit }, element) {
    commit('LOAD_PLAYER_INSTANCE', element)
    commit('SET_VOLUME', '100')
    element.addEventListener('message', (e) => {
      const { type, data } = e.data
      if (type === 'ready') {
        commit('PLAYER_READY', true)
        state.playerInstance.playerReady()
      } else if (type === 'property_change') {
        const { name, value } = data
        if (name === 'duration') {
          commit('SET_DURATION', value)
        } else if (name === 'pause') {
          if (!state.isSeeking) {
            commit('TOGGLE_PLAY', !value)
          }
        } else if (name === 'volume') {
          commit('SET_VOLUME', value)
        } else if (name === 'time-pos') {
          if (!state.isSeeking) commit('SET_SEEK', value)
        } else if (name === 'eof-reached') {
          if (value && state.order !== state.fileList.length - 1) {
            commit('GO_NEXT')
            state.playerInstance.loadFile(state.fileList[state.order])
            state.playerInstance.goPlay(true)
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
    if (state.playerInstance != null && state.playerReady) {
      state.playerInstance.goPlay(false)
      state.playerInstance.stop(state.playerInstance)
      commit('TOGGLE_PLAY', false)
      commit('LOAD_FILES', files)
      commit('SET_ORDER', 0)
      state.playerInstance.loadFile(state.fileList[state.order])

      let autoPlay = app.config.get('autoPlay')
      if (autoPlay) {
        state.playerInstance.goPlay(true)
      }
    }
  },
  setVolume (_, volume) {
    if (state.playerInstance != null && state.playerReady) {
      state.playerInstance.setVolume(volume)
    }
  },
  togglePlay () {
    if (state.playerInstance != null &&
      state.playerReady &&
      state.fileList.length) {
      if (state.order === state.fileList.length - 1 &&
        Math.floor(state.seek) === Math.floor(state.duration)) {
        state.playerInstance.seek(0)
      }
      state.playerInstance.goPlay(!state.isPlaying)
    }
  },
  stop ({ commit }) {
    if (state.playerInstance != null && state.playerReady) {
      state.playerInstance.goPlay(false)
      state.playerInstance.seek(0)
      commit('TOGGLE_PLAY', false)
    }
  },
  seek ({ commit }, seconds) {
    commit('SET_SEEK', seconds)
    state.playerInstance.seek(seconds)
  },
  seeking ({ commit }, isSeeking) {
    if (isSeeking || !state.isPlaying) {
      state.playerInstance.goPlay(false)
    } else {
      state.playerInstance.goPlay(true)
    }
    commit('SET_SEEKING', isSeeking)
  },
  goPrevious ({ commit }) {
    if (!state.fileList.length) return
    commit('GO_PREVIOUS')
    state.playerInstance.loadFile(state.fileList[state.order])
  },
  goNext ({ commit }) {
    if (!state.fileList.length) return
    commit('GO_NEXT')
    state.playerInstance.loadFile(state.fileList[state.order])
  },
  goBackward () {
    if (!state.fileList.length) return
    let seconds = state.seek - 5
    if (seconds < 0) seconds = 0
    state.playerInstance.seek(seconds)
  },
  goForward () {
    if (!state.fileList.length) return
    state.playerInstance.seek(state.seek + 5)
  },
  setOrder ({ commit }, order) {
    commit('SET_ORDER', order)
    state.playerInstance.loadFile(state.fileList[state.order])
  },
  toggleMute ({ commit }) {
    if (state.playerInstance != null) {
      state.isMute
        ? state.playerInstance.unmute(state.playerInstance)
        : state.playerInstance.mute(state.playerInstance)
      commit('TOGGLE_MUTE')
    }
  },
  getScreenshot () {
    state.playerInstance.screenshot(false)
  },
  toggleStat ({ commit }) {
    state.playerInstance.stat(state.playerInstance)
    commit('TOGGLE_STAT')
  }
}

export default {
  state,
  mutations,
  actions
}
