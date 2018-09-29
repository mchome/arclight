<template>
  <div id="playlist">
    <div id="filelist"></div>
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
  flex: 1;
  display: flex;
  flex-direction: column;
}

#filelist {
  flex: 1;
  background-color: aliceblue;
}
</style>
