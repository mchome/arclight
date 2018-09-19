const state = {
  playerNode: null,
  currentOrder: 0,
  currentFileList: [],
  isPlaying: false,
  isMute: false
}

const mutations = {
  LOAD_PLAYER_NODE (state, playerNode) {
    state.playerNode = playerNode
  },
  LOAD_FILES (state, files) {
    if (state.playerNode != null) {
      state.playerNode.postMessage({
        type: 'command',
        data: ['loadfile', files[0]]
      })
      state.currentFileList = files
    }
  },
  TOGGLE_PLAY (state, playState = null) {
    if (state.playerNode != null) {
      const val = (playState == null) ? state.isPlaying : !playState
      state.playerNode.postMessage({
        type: 'set_property',
        data: {
          name: 'pause',
          value: val
        }
      })
      state.isPlaying = (playState == null) ? !state.isPlaying : playState
    }
  },
  PLAY_PREVIEW (state) {},
  PLAY_NEXT (state) {},
  TOGGLE_MUTE (state) {
    if (state.playerNode != null) {
      state.isMute = !state.isMute
    }
  }
}

const actions = {
  loadPlayerNode ({ commit }, playerNode) {
    commit('LOAD_PLAYER_NODE', playerNode)
  },
  loadFiles ({ commit }, files) {
    commit('TOGGLE_PLAY', false)
    commit('LOAD_FILES', files)
  },
  togglePlay ({ commit }) {
    commit('TOGGLE_PLAY')
  },
  playPrevious ({ commit }) {
    commit('PLAY_PREVIOUS')
  },
  playNext ({ commit }) {
    commit('PLAY_NEXT')
  },
  toggleMute ({ commit }) {
    commit('TOGGLE_MUTE')
  }
}

export default {
  state,
  mutations,
  actions
}
