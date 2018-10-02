<template>
  <div id="side-panel">
    <titlebar>
      <p slot="title">{{ panelName }}</p>
    </titlebar>
    <dir id="panel">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </dir>
  </div>
</template>

<script>
import Titlebar from './SidePanel/Titlebar'

export default {
  components: {
    Titlebar
  },
  computed: {
    panelName () {
      return this.$route.name
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
  overflow: hidden;
}

#panel {
  flex: 1;
  background-color: #0f0f0f;
  color: #e2e2e2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
