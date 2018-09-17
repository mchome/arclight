<template>
  <div id="container">
    <titlebar></titlebar>
    <div id="player"></div>
    <controller></controller>
  </div>
</template>

<script>
import Titlebar from './Titlebar'
import Controller from './Player/Controller'

export default {
  name: 'player',
  methods: {},
  components: {
    Titlebar,
    Controller
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
}
</style>
