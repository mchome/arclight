<template>
  <div id="titlebar">
    <div id="title" @dblclick="toggleFullscreen">
      <p>{{ title }}</p>
    </div>

    <div id="media-title" class="draggable" v-show="!isFullscreen && !isMaximize">
      <p>{{ fileName }}</p>
    </div>
    <div id="media-title" v-show="isFullscreen || isMaximize">
      <p>{{ fileName }}</p>
    </div>

    <div id="command-btns">
      <pin-icon v-show="!isPinned" @click.native="togglePin" title="Pin to top" />
      <pin-off-icon v-show="isPinned" @click.native="togglePin" title="Unpin" />

      <fullscreen-icon v-show="!isFullscreen && !isMaximize" @click.native="toggleFullscreen" title="Into fullscreen" />
      <fullscreen-exit-icon v-show="isFullscreen && !isMaximize" @click.native="toggleFullscreen" title="Exit fullscreen" />

      <div id="separator"></div>

      <window-minimize-icon @click.native="toggleMinimize" title="Minimize" />

      <window-maximize-icon v-show="!isMaximize && !isFullscreen" @click.native="toggleMaximize" title="Maximize" />
      <window-restore-icon v-show="isMaximize && !isFullscreen" @click.native="toggleMaximize" title="Unmaximize" />

      <window-close-icon id="close-btn" @click.native="exitApp" title="Exit" />
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

export default {
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
    title () {
      return this.$electron.remote.app.getName()
    },
    isFullscreen () {
      const val = this.$store.state.Window.isFullscreen
      try {
        if (val) {
          this.$electron.remote.getCurrentWindow().setResizable(false)
        } else {
          this.$electron.remote.getCurrentWindow().setResizable(true)
        }
      } catch (_) { }
      return val
    },
    isMaximize () {
      const val = this.$store.state.Window.isMaximize
      try {
        if (val) {
          this.$electron.remote.getCurrentWindow().setResizable(false)
        } else {
          this.$electron.remote.getCurrentWindow().setResizable(true)
        }
      } catch (_) { }
      return val
    },
    isPinned () {
      return this.$store.state.Window.isPinned
    },
    fileName () {
      const order = `(${this.$store.state.Player.order + 1}/${this.$store.state.Player.fileList.length})`
      return this.$store.state.Player.fileList.length
        ? `${order} ${this.$store.state.Player.fileName}`
        : this.$store.state.Player.fileName
    }
  },
  methods: {
    toggleMaximize () {
      this.$store.dispatch('toggleMaximize')
    },
    toggleMinimize () {
      this.$electron.remote.getCurrentWindow().minimize()
    },
    toggleFullscreen () {
      this.$store.dispatch('toggleFullscreen')
    },
    togglePin () {
      this.$store.dispatch('togglePin')
    },
    exitApp () {
      this.$electron.remote.app.exit(0)
    }
  }
}
</script>

<style scoped>
#titlebar {
  height: 2rem;
  background-color: #1d1d1d;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #000000;
  opacity: 1.0;
  transition: all 0.2s cubic-bezier(0.215, 0.610, 0.355, 1);
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
  text-transform: capitalize;
}

#media-title {
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: lighter;
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: 0.7px;
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
#command-btns >>> svg {
  width: 100%;
  height: 100%;
  padding: 0.55rem;
}
#command-btns > #separator {
  margin: 0 0.3rem;
}
#close-btn:hover {
  background-color: #D41223 !important;
}
</style>
