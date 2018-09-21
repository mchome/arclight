<template>
  <div id="player-canvas"
    :class="{
      fullscreen: isFullscreen,
      maximize: isMaximize,
      fillscreen: osdMode && !isFullscreen
    }">
    <embed id="mpvjs" type="application/x-mpvjs" />
  </div>
</template>

<script>
export default {
  computed: {
    playerReady () {
      return this.$store.state.Player.playerReady
    },
    isFullscreen () {
      return this.$store.state.Window.isFullscreen
    },
    isMaximize () {
      return this.$store.state.Window.isMaximize
    },
    osdMode () {
      return this.$store.state.Settings.osdMode
    }
  },
  watch: {
    playerReady (value, _) {
      if (value) {
        this.loadFile()
      }
    }
  },
  methods: {
    loadFile () {
      // TODO: delete me
      const files = [require('path').join(__dirname, '../../../../test.mp4')]
      print(files)
      this.$store.dispatch('loadFiles', files)
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
  display: flex;
  position: absolute;
  height: calc(100% - 16px - 6rem);
  width: calc(100% - 16px);
  z-index: -1;
  margin-top: 2rem;
}
#mpvjs {
  flex: 1;
}

.maximize {
  height: calc(100% - 4px - 6rem) !important;
  width: calc(100% - 4px) !important;
}
.fullscreen {
  height: 100% !important;
  width: 100% !important;
  margin: 0 !important;
}
.fillscreen {
  height: calc(100% - 16px) !important;
  margin: 0 !important;
}
</style>
