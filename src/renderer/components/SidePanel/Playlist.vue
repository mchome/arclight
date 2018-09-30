<template>
  <div id="playlist">
    playlist
    <div id="filelist">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    fileList: {
      get () {
        return this.$store.state.Player.fileList
      }
    }
  }
}
</script>

<style scoped>
#playlist {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#filelist {
  flex: 1;
}
</style>
