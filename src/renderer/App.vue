<template>
  <div id="app" :class="{ border: displayBorder, shadow: displayShadow }">
    <router-view></router-view>
  </div>
</template>

<script>
const Mousetrap = require('mousetrap')

export default {
  computed: {
    displayBorder () {
      return !this.$store.state.Window.isFullscreen
    },
    displayShadow () {
      return !this.$store.state.Window.isFullscreen && !this.$store.state.Window.isMaximize
    }
  },
  mounted () {
    Mousetrap.bind('enter', function () {
      this.$store.dispatch('toggleFullscreen')
    }.bind(this))
    Mousetrap.bind('space', function () {
      this.$store.dispatch('togglePlay')
    }.bind(this))
    Mousetrap.bind('ctrl+c', function () {
      print('save screenshot to clipboard')
    })
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
