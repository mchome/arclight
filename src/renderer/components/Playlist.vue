<template>
  <div id="playlist">
    <titlebar>
      <p slot="title">Playlist</p>
    </titlebar>
  </div>
</template>

<script>
import Titlebar from './Common/Titlebar'

export default {
  components: {
    Titlebar
  },
  computed: {
  }
}
</script>

<style>
#playlist {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
