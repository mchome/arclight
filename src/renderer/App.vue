<template>
  <div id="app" :class="{ border: displayBorder, shadow: displayShadow }">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    displayBorder () {
      return !this.$store.state.Window.isFullscreen
    },
    displayShadow () {
      return !this.$store.state.Window.isFullscreen && !this.$store.state.Window.isMaximize
    },
    volume () {
      return this.$store.state.Player.volume
    }
  },
  mounted () {
    // this.$electron.remote.get

    // Mousetrap.bind('enter', function () {
    //   this.$store.dispatch('toggleFullscreen')
    // }.bind(this))
    // Mousetrap.bind('space', function () {
    //   this.$store.dispatch('togglePlay')
    // }.bind(this))
    // Mousetrap.bind('ctrl+c', function () {
    //   print('save screenshot to clipboard')
    // })
    // Mousetrap.bind('left', function () {
    //   this.$store.dispatch('goBackward')
    // }.bind(this), 'keyup')
    // Mousetrap.bind('right', function () {
    //   this.$store.dispatch('goForward')
    // }.bind(this), 'keyup')
    // Mousetrap.bind('ctrl+left', function () {
    //   this.$store.dispatch('goPrevious')
    // }.bind(this), 'keyup')
    // Mousetrap.bind('ctrl+right', function () {
    //   this.$store.dispatch('goNext')
    // }.bind(this), 'keyup')
    // Mousetrap.bind('up', function () {
    //   this.$store.dispatch('setVolume', this.volume + 5)
    // }.bind(this), 'keyup')
    // Mousetrap.bind('down', function () {
    //   this.$store.dispatch('setVolume', this.volume - 5)
    // }.bind(this), 'keyup')
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: Roboto, Lato, Helvetica, "Monaco", "Avenir", "Segoe UI",
    "Microsoft YaHei", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: default;
  user-select: none;
  /* opacity: 0.95; */
}

html,
body {
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
}
.border {
  height: calc(100% - 4px) !important;
  border: 2px solid #000000;
}
.shadow {
  margin: 6px;
  height: calc(100% - 16px) !important;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>
