<template>
  <div id="titlebar">
    <div id="title">
      <p>Arclight</p>
    </div>
    <div class="draggable"></div>
    <div id="command-btns">
      <pin-icon v-if="!isPinned" @click.native="togglePin" />
      <pin-off-icon v-if="isPinned" @click.native="togglePin" />

      <fullscreen-icon v-if="!isFullscreen" @click.native="toggleFullscreen" />
      <fullscreen-exit-icon v-if="isFullscreen" @click.native="toggleFullscreen" />

      <window-minimize-icon @click.native="toggleMinimize" />

      <window-restore-icon v-if="isMaximize" @click.native="toggleMaximize" />
      <window-maximize-icon v-if="!isMaximize" @click.native="toggleMaximize" />

      <window-close-icon id="close-btn" @click.native="toggleClose" />
    </div>
  </div>
</template>

<script>
import PinIcon from 'icons/Pin'
import PinOffIcon from 'icons/PinOff'
import FullscreenIcon from 'icons/Fullscreen'
import FullscreenExitIcon from 'icons/FullscreenExit'
import WindowMinimizeIcon from 'icons/WindowMinimize'
import WindowRestoreIcon from 'icons/WindowRestore'
import WindowMaximizeIcon from 'icons/WindowMaximize'
import WindowCloseIcon from 'icons/WindowClose'

const drag = require('electron-drag')

export default {
  name: 'titlebar',
  data () {
    return {}
  },
  components: {
    PinIcon,
    PinOffIcon,
    FullscreenIcon,
    FullscreenExitIcon,
    WindowMinimizeIcon,
    WindowRestoreIcon,
    WindowMaximizeIcon,
    WindowCloseIcon
  },
  computed: {
    isFullscreen () {
      return this.$store.state.Window.isFullscreen
    },
    isMaximize () {
      return this.$store.state.Window.isMaximize
    },
    isPinned () {
      return this.$store.state.Window.isPinned
    }
  },
  methods: {
    toggleMaximize () {
      this.$store.dispatch('toggleMaximize')
    },
    toggleMinimize () {
      this.$electron.remote.BrowserWindow.getFocusedWindow().minimize()
    },
    toggleFullscreen () {
      this.$store.dispatch('toggleFullscreen')
    },
    togglePin () {
      this.$store.dispatch('togglePin')
    },
    toggleClose () {
      this.$store.dispatch('toggleClose')
    }
  },
  mounted () {
    drag('.draggable')
  }
}
</script>

<style>
#titlebar {
  height: 2rem;
  background-color: #1d1d1d;
  display: flex;
  flex-direction: row;
  align-items: center;
}
#titlebar > * {
  color: #e2e2e2;
}

#title {
  height: 100%;
  padding: 0 0.8rem;
  font-size: 0.9rem;
  display: flex;
  font-weight: lighter;
  align-items: center;
}
#title:hover {
  background-color: #333333;
}

.draggable {
  flex: 1;
  height: 100%;
}

#command-btns {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
#command-btns > span {
  width: 2rem;
  display: flex;
  justify-content: center;
}
#command-btns > span:hover {
  background-color: #363736;
}
#command-btns svg {
  transform: scale(0.6);
}
#close-btn:hover {
  background-color: #D41223 !important;
}
</style>
