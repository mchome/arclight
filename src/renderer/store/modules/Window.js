const electron = require('electron').remote

const state = {
  isMaximize: false,
  isFullscreen: false,
  isPinned: false
}

const mutations = {
  TOGGLE_MAXIMIZE (state) {
    if (state.isMaximize) {
      electron.getCurrentWindow().unmaximize()
    } else {
      electron.getCurrentWindow().maximize()
    }
    state.isMaximize = !state.isMaximize
  },
  TOGGLE_FULLSCREEN (state) {
    if (state.isFullscreen) {
      electron.getCurrentWindow().setFullScreen(false)
    } else {
      electron.getCurrentWindow().setFullScreen(true)
    }
    state.isFullscreen = !state.isFullscreen
  },
  TOGGLE_PIN (state) {
    if (state.isPinned) {
      electron.getCurrentWindow().setAlwaysOnTop(false)
    } else {
      electron.getCurrentWindow().setAlwaysOnTop(true)
    }
    state.isPinned = !state.isPinned
  }
}

const actions = {
  toggleMaximize ({ commit }) {
    commit('TOGGLE_MAXIMIZE')
  },
  toggleFullscreen ({ commit }) {
    commit('TOGGLE_FULLSCREEN')
  },
  togglePin ({ commit }) {
    commit('TOGGLE_PIN')
  }
}

export default {
  state,
  mutations,
  actions
}
