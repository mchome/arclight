<template>
  <div id="app"
    :class="{ border: displayBorder, shadow: displayShadow }">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    winid () {
      return parseInt(this.$route.params.winid)
    },
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
    const win = this.$electron.remote.BrowserWindow.fromId(1)
    const { ipcRenderer } = require('electron')
    const drag = require('electron-drag')

    drag('.draggable')
    if (!drag.supported) {
      document.querySelector('.draggable').style['-webkit-app-region'] = 'drag'
    }

    if (this.winid === 1) {
      electronLocalshortcut.register(win, 'P', function () {
        this.$store.dispatch('togglePlay')
      }.bind(this))
      electronLocalshortcut.register(win, 'I', function () {
        this.$store.dispatch('toggleStat')
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
      electronLocalshortcut.register(win, 'CommandOrControl+Left', function () {
        this.$store.dispatch('goPrevious')
      }.bind(this))
      electronLocalshortcut.register(win, 'CommandOrControl+Right', function () {
        this.$store.dispatch('goNext')
      }.bind(this))
      electronLocalshortcut.register(win, 'CommandOrControl+C', function () {
        this.$store.dispatch('getScreenshot')
      }.bind(this))

      // polyfill
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === 32) {
          this.$store.dispatch('togglePlay')
        }
      }.bind(this), true)
      window.addEventListener('keyup', function (e) {
        if (e.keyCode === 37) {
          this.$store.dispatch('goBackward')
        } else if (e.keyCode === 39) {
          this.$store.dispatch('goForward')
        }
      }.bind(this), true)

      // global shortcuts
      ipcRenderer.on('global-key-event', function (_, message) {
        if (message === 'toggle-play') {
          this.$store.dispatch('togglePlay')
        } else if (message === 'go-previous') {
          this.$store.dispatch('goPrevious')
        } else if (message === 'go-next') {
          this.$store.dispatch('goNext')
        }
      }.bind(this))
      ipcRenderer.on('window-opened', function (_, message) {
        const msg = JSON.parse(message)
        if (msg.filter(i => i.arg === 'side-panel').length) {
          this.$store.dispatch('setSidePanel', true)
        } else {
          this.$store.dispatch('setSidePanel', false)
        }
      }.bind(this))
    }

    if (this.winid === 1) {
      /// receive some dispatches: { action, payload }
      window.addEventListener('storage', function (e) {
        if (e.key === 'popup-window-dispatch' && e.newValue) {
          const { action, payload } = JSON.parse(e.newValue)
          this.$store.dispatch(action, payload)
        }
      }.bind(this))
    } else {
      this.$store.renderDispatch = (action, payload) => {
        window.localStorage.setItem('popup-window-dispatch',
          JSON.stringify({ action, payload }))
        window.localStorage.removeItem('popup-window-dispatch')
      }
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'NotoSansCJK';
  src: url("~@/assets/fonts/NotoSansCJKsc-Regular.otf")  format("truetype");
  font-weight: normal;
}
@font-face {
  font-family: "NotoSansCJK";
  src: url("~@/assets/fonts/NotoSansCJKsc-Light.otf")  format("truetype");
  font-weight: lighter;
}

* {
  margin: 0;
  padding: 0;
  font-family: Roboto, Lato, Helvetica, "Monaco", "Avenir", "Segoe UI",
    "Microsoft YaHei", "NotoSansCJK", Arial, sans-serif;
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
  box-shadow: 0 3px 6px rgba(0,0,0,0.16),
              0 3px 6px rgba(0,0,0,0.23);
}

/* .draggable {
  -webkit-app-region: drag
} */
</style>
