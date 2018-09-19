<template>
  <div id="player-canvas">
    <embed id="mpvjs" type="application/x-mpvjs" />
    <div id="mask-controller" @click="togglePlay"></div>
  </div>
</template>

<script>
export default {
  methods: {
    loadFile () {
      const files = ['']
      this.$store.dispatch('loadFiles', files)
    },
    togglePlay () {
      this.$store.dispatch('togglePlay')
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$store.dispatch('loadPlayerNode', document.getElementById('mpvjs'))

      // TODO: delete me
      setTimeout(() => {
        this.loadFile()
      }, 0)
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
