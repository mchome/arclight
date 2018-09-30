<template>
  <div id="player" @dragover.prevent @drop="loadFile">
    <titlebar
      :class="{
        hide: hideTitleBar,
        'transparent-show': isFullscreen || osdMode
      }"
      @mouseover.native="isHoverUpper = true"
      @mouseout.native="isHoverUpper = false" />
    <div id="mask-controller"
      @click="togglePlay"
      @mousemove="hideCursor"
      :class="{ 'hide-cursor': isHideCursor }">
    </div>
    <player-canvas></player-canvas>
    <player-controller
      :class="{
        hide: hideController,
        'transparent-show': isFullscreen || osdMode
      }"
      @mouseover.native="isHoverLower = true"
      @mouseout.native="isHoverLower = false" />
  </div>
</template>

<script>
import Titlebar from './Player/Titlebar'
import PlayerCanvas from './Player/Canvas'
import PlayerController from './Player/Controller'

const fs = require('fs')

export default {
  components: {
    Titlebar,
    PlayerCanvas,
    PlayerController
  },
  data () {
    return {
      isHoverUpper: false,
      isHoverLower: false,
      isHideCursor: false,
      hideCursorTimeout: null
    }
  },
  computed: {
    isPlaying () {
      return this.$store.state.Player.isPlaying
    },
    isFullscreen () {
      return this.$store.state.Window.isFullscreen
    },
    osdMode () {
      return this.$store.state.Settings.osdMode
    },
    hideTitleBar () {
      return (this.isFullscreen || this.osdMode) && !this.isHoverUpper
    },
    hideController () {
      return (this.isFullscreen || this.osdMode) && !this.isHoverLower
    }
  },
  // watch: {
  //   isPlaying: function (val) {
  //     if (this.isFullscreen && val) {
  //       this.isHideCursor = false
  //       clearTimeout(this.hideCursorTimeout)
  //       this.hideCursorTimeout = setTimeout(function () {
  //         this.isHideCursor = true
  //       }.bind(this), 1500)
  //     } else if (this.isHideCursor) {
  //       this.isHideCursor = false
  //       clearTimeout(this.hideCursorTimeout)
  //     }
  //   },
  //   isFullscreen: function (val) {
  //     if (!this.isFullscreen && this.isHideCursor) {
  //       this.isHideCursor = false
  //       clearTimeout(this.hideCursorTimeout)
  //     }
  //   }
  // },
  methods: {
    loadFile (e) {
      e.preventDefault()
      let files = []
      const urls = e.dataTransfer.getData('text')

      for (let file of e.dataTransfer.files) {
        if (fs.statSync(file.path).isFile()) {
          files.push(file.path)
        } else {
          fs.readdirSync(file.path).forEach((f) => {
            if (fs.statSync(require('path').join(file.path, f)).isFile()) {
              files.push(require('path').join(file.path, f))
            }
          })
        }
      }
      if (urls.length) {
        files = files.concat(urls.split(/\r?\n/))
      }
      if (files.length) {
        this.$store.dispatch('loadFiles', files)
      }
    },
    togglePlay () {
      this.$store.dispatch('togglePlay')
    },
    toggleFullscreen () {
      this.$store.dispatch('toggleFullscreen')
    },
    hideCursor () {
      // if (this.isFullscreen && this.isPlaying) {
      //   this.isHideCursor = false
      //   clearTimeout(this.hideCursorTimeout)
      //   this.hideCursorTimeout = setTimeout(function () {
      //     this.isHideCursor = true
      //   }.bind(this), 1500)
      // }
    }
  },
  mounted () {
    /// receive some dispatches: { action, payload }
    window.addEventListener('storage', function (e) {
      if (e.key === 'popup-window-dispatch' && e.newValue) {
        const { action, payload } = JSON.parse(e.newValue)
        this.$store.dispatch(action, payload)
      }
    }.bind(this))
  }
}
</script>

<style scoped>
#player {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

#mask-controller {
  flex: 1;
  z-index: 10;
}
.transparent-show {
  opacity: 0.75 !important;
}
.hide {
  opacity: 0.0 !important;
}

.hide-cursor {
  cursor: none;
}
</style>
