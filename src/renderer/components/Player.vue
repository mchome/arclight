<template>
  <div id="player" @dragover.prevent @drop="loadFile">
    <titlebar
      :class="{
        hide: hideTitleBar,
        'half-show': isFullscreen || osdMode
      }"
      @mouseover.native="isHoverUpper = true"
      @mouseout.native="isHoverUpper = false" />
    <div id="mask-controller" v-hammer:tap="togglePlay"></div>
    <player-canvas></player-canvas>
    <player-controller
      :class="{
        hide: hideController,
        'half-show': isFullscreen || osdMode
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
      isHoverLower: false
    }
  },
  computed: {
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
  methods: {
    loadFile (e) {
      e.preventDefault()
      let files = []
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
    // receive some mutations: { type, payload }
    window.addEventListener('storage', function (e) {
      if (e.key === 'popup-window-mutation' && e.newValue) {
        const { type, payload } = JSON.parse(e.newValue)
        this.$store.commit(type, payload)
      }
    }.bind(this))
  }
}
</script>

<style>
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
.half-show {
  opacity: 0.75 !important;
}
.hide {
  opacity: 0.0 !important;
}
</style>
