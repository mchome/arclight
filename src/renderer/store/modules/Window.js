const electron = require('electron').remote

const state = {
  isMaximize: false,
  isFullscreen: false,
  isPinned: false
}

const mutations = {
  TOGGLE_MAXIMIZE (state) {
    state.isMaximize = !state.isMaximize
  },
  TOGGLE_FULLSCREEN (state) {
    state.isFullscreen = !state.isFullscreen
  },
  TOGGLE_PIN (state) {
    state.isPinned = !state.isPinned
  }
}

const actions = {
  toggleMaximize ({ commit }) {
    if (state.isMaximize) {
      electron.getCurrentWindow().unmaximize()
    } else {
      electron.getCurrentWindow().maximize()
    }
    commit('TOGGLE_MAXIMIZE')
  },
  toggleFullscreen ({ commit }) {
    if (state.isFullscreen) {
      electron.getCurrentWindow().setFullScreen(false)
    } else {
      electron.getCurrentWindow().setFullScreen(true)
    }
    commit('TOGGLE_FULLSCREEN')
  },
  togglePin ({ commit }) {
    if (state.isPinned) {
      electron.getCurrentWindow().setAlwaysOnTop(false)
    } else {
      electron.getCurrentWindow().setAlwaysOnTop(true)
    }
    commit('TOGGLE_PIN')
  }
}

export default {
  state,
  mutations,
  actions
}
