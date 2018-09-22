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
    const electronLocalshortcut = require('electron-localshortcut')
    const win = this.$electron.remote.BrowserWindow.getFocusedWindow()
    const { ipcRenderer } = require('electron')

    electronLocalshortcut.register(win, 'P', function () {
      this.$store.dispatch('togglePlay')
    }.bind(this))
    electronLocalshortcut.register(win, 'Enter', function () {
      this.$store.dispatch('toggleFullscreen')
    }.bind(this))
    electronLocalshortcut.register(win, 'Up', function () {
      this.$store.dispatch('setVolume', this.volume + 5)
    }.bind(this))
    electronLocalshortcut.register(win, 'Down', function () {
      this.$store.dispatch('setVolume', this.volume - 5)
    }.bind(this))
    electronLocalshortcut.register(win, 'Left', function () {
      this.$store.dispatch('goBackward')
    }.bind(this))
    electronLocalshortcut.register(win, 'Right', function () {
      this.$store.dispatch('goForward')
    }.bind(this))
    electronLocalshortcut.register(win, 'CommandOrControl+Left', function () {
      this.$store.dispatch('goPrevious')
    }.bind(this))
    electronLocalshortcut.register(win, 'CommandOrControl+Right', function () {
      this.$store.dispatch('goNext')
    }.bind(this))
    electronLocalshortcut.register(win, 'CommandOrControl+C', function () {
      print('save screenshot to clipboard')
    })
    // polyfill
    window.addEventListener('keydown', function (e) {
      // print(e.keyCode)
      if (e.keyCode === 32) {
        this.$store.dispatch('togglePlay')
      }
    }.bind(this), true)

    ipcRenderer.on('global-key-event', function (_, message) {
      if (message === 'toggle-play') {
        this.$store.dispatch('togglePlay')
      } else if (message === 'go-previous') {
        this.$store.dispatch('goPrevious')
      } else if (message === 'go-next') {
        this.$store.dispatch('goNext')
      }
    }.bind(this))
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
