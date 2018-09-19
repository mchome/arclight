<template>
  <div id="container">
    <titlebar></titlebar>
    <div id="player" @dragover.prevent @drop="loadFile">
      <player-canvas></player-canvas>
      <player-controller></player-controller>
    </div>
  </div>
</template>

<script>
import Titlebar from './Titlebar'
import PlayerCanvas from './Player/Canvas'
import PlayerController from './Player/Controller'

const fs = require('fs')

export default {
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
    }
  },
  components: {
    Titlebar,
    PlayerCanvas,
    PlayerController
  }
}
</script>

<style>
#container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#player {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
