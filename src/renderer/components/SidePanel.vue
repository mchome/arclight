<template>
  <div id="side-panel">
    <titlebar>
      <p slot="title">Side Panel</p>
    </titlebar>
    <router-view></router-view>
  </div>
</template>

<script>
import Titlebar from './SidePanel/Titlebar'

export default {
  components: {
    Titlebar
  },
  computed: {
    winid () {
      return parseInt(this.$route.params.winid)
    }
  }
}
</script>

<style scoped>
#side-panel {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

#panel {
  flex: 1;
}
</style>
