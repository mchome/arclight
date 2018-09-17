const state = {
  _isMaximize: false
}

const mutations = {
  _TOGGLE_MAXIMIZE (state) {
    if (state._isMaximize) {} else {}
    state._isMaximize = !state._isMaximize
  }
}

const actions = {
  _toggleMaximize ({ commit }) {
    commit('_TOGGLE_MAXIMIZE')
  }
}

export default {
  state,
  mutations,
  actions
}
