const electron = require('electron').remote

const state = {
  isMaximize: false,
  isFullscreen: false,
  isPinned: false,
  isSidePanelOpened: false,
  _windowBound: { x: 0, y: 0, width: 0, height: 0 }
}

const mutations = {
  SET_MAINWINDOW (state, bounds) {
    state._windowBound = bounds
  },
  TOGGLE_MAXIMIZE (state) {
    state.isMaximize = !state.isMaximize
  },
  TOGGLE_FULLSCREEN (state) {
    state.isFullscreen = !state.isFullscreen
  },
  TOGGLE_PIN (state) {
    state.isPinned = !state.isPinned
  },
  SET_SIDE_PANEL (state, isOpened) {
    state.isSidePanelOpened = isOpened
  },
  SET_CUSTOM_WINDOW_SHADOW (state, isCustom) {
    state.isSidePanelOpened = isCustom
  }
}

const actions = {
  toggleMaximize ({ commit }) {
    if (state.isMaximize) {
      electron.BrowserWindow.fromId(1).unmaximize()
      electron.BrowserWindow.fromId(1).setBounds(state._windowBound, true)
    } else {
      commit('SET_MAINWINDOW', electron.BrowserWindow.fromId(1).getBounds())
      electron.BrowserWindow.fromId(1).maximize()
    }
    commit('TOGGLE_MAXIMIZE')
  },
  toggleFullscreen ({ commit }) {
    if (state.isFullscreen) {
      electron.BrowserWindow.fromId(1).setFullScreen(false)
      // electron.BrowserWindow.fromId(1).setKiosk(false)
      electron.BrowserWindow.fromId(1).setBounds(state._windowBound, true)
    } else {
      commit('SET_MAINWINDOW', electron.BrowserWindow.fromId(1).getBounds())
      electron.BrowserWindow.fromId(1).setFullScreen(true)
      // electron.BrowserWindow.fromId(1).setKiosk(true)
    }
    commit('TOGGLE_FULLSCREEN')
  },
  togglePin ({ commit }) {
    if (state.isPinned) {
      electron.BrowserWindow.fromId(1).setAlwaysOnTop(false)
    } else {
      electron.BrowserWindow.fromId(1).setAlwaysOnTop(true)
    }
    commit('TOGGLE_PIN')
  },
  setSidePanel ({ commit }, isOpened) {
    commit('SET_SIDE_PANEL', isOpened)
  },
  setCustomWindowShadow ({ commit }, isCustom) {
    commit('SET_CUSTOM_WINDOW_SHADOW', isCustom)
  }
}

export default {
  state,
  mutations,
  actions
}
