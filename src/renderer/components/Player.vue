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
      :class="{ 'logo': isDisplayLogo }"
      @click="togglePlay">
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

import drive from '../drive'

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
    },
    isDisplayLogo () {
      return !this.$store.state.Player.fileList.length
    }
  },
  methods: {
    loadFile (e) {
      e.preventDefault()
      let files = []

      files = files.concat(drive.parseFiles(e.dataTransfer.files))

      const urls = e.dataTransfer.getData('text')
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
    }
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
.logo {
  background-color: #0f0f0f;
  background-image: url(../assets/logo.png);
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
}

.transparent-show {
  opacity: 0.75 !important;
}
.hide {
  opacity: 0.0 !important;
}
</style>
