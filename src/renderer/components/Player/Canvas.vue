<template>
  <div id="player-canvas">
    <embed id="mpvjs" type="application/x-mpvjs" />
    <div id="mask-controller"
      v-hammer:tap="togglePlay"
      v-hammer:press="togglePlay"></div>
  </div>
</template>

<script>
export default {
  computed: {
    playerReady () {
      return this.$store.state.Player.playerReady
    }
  },
  watch: {
    // TODO: delete me
    playerReady (value, _) {
      if (value) {
        this.loadFile()
      }
    }
  },
  methods: {
    // TODO: delete me
    loadFile () {
      const files = ['']
      this.$store.dispatch('loadFiles', files)
    },
    togglePlay () {
      this.$store.dispatch('togglePlay')
    },
    toggleFullscreen () {
      this.$store.dispatch('toggleFullscreen')
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$store.dispatch('loadPlayerNode', document.getElementById('mpvjs'))
    })
  }
}
</script>

<style>
#player-canvas {
  flex: 1;
  display: flex;
  width: 200%;
}
#mpvjs {
  flex: 1;
}
#mask-controller {
  flex: 1;
  transform: translateX(-100%);
  z-index: 10;
}
</style>
