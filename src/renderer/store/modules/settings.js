const state = {
  osdMode: false,
  appFont: ''
}

const mutations = {
  TOGGLE_OSD_MODE (state) {
    state.osdMode = !state.osdMode
  },
  SET_APP_FONT (state, fontPath) {
    state.appFont = fontPath
  }
}

const actions = {
  toggleOsdMode ({ commit }) {
    commit('TOGGLE_OSD_MODE')
  },
  setApp_font ({ commit }, fontPath) {
    commit('SET_APP_FONT', fontPath)
  }
}

export default {
  state,
  mutations,
  actions
}
