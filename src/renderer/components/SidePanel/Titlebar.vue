<template>
  <div id="titlebar">
    <div id="menu-btn">
      <menu-icon @click.native="toggleDrawer" title="Menu"></menu-icon>
    </div>
    <div id="title" class="draggable">
      <slot name="title"></slot>
    </div>

    <div id="close-btn">
      <window-close-icon @click.native="close" title="Close" />
    </div>

    <transition name="fade">
      <div id="drawer"
        :class="{ 'drawer-with-custom-shadow': isCustomWindowShadow }"
        v-show="isOpenDrawer"
        @click="toggleDrawer">
        <div id="drawer-items">
          <router-link tag="div" :to="{ name: 'playlist' }">
            <playlist-play-icon />
            <p>Playlist</p>
          </router-link>
          <router-link tag="div" :to="{ name: 'metadata' }">
            <content-copy-icon />
            <p>Metadata</p>
          </router-link>
          <router-link tag="div" :to="{ name: 'effect' }">
            <image-filter-hdr-icon />
            <p>Effect</p>
          </router-link>
          <router-link tag="div" :to="{ name: 'settings' }">
            <settings-icon />
            <p>Settings</p>
          </router-link>
          <router-link tag="div" :to="{ name: 'about' }">
            <information-outline-icon />
            <p>About</p>
          </router-link>
        </div>
        <div id="drawer-mask"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import MenuIcon from 'icons/Menu'
import WindowCloseIcon from 'icons/WindowClose'
import PlaylistPlayIcon from 'icons/PlaylistPlay'
import ContentCopyIcon from 'icons/ContentCopy'
import ImageFilterHdrIcon from 'icons/ImageFilterHdr'
import SettingsIcon from 'icons/Settings'
import InformationOutlineIcon from 'icons/InformationOutline'

export default {
  components: {
    MenuIcon,
    WindowCloseIcon,
    PlaylistPlayIcon,
    ContentCopyIcon,
    ImageFilterHdrIcon,
    SettingsIcon,
    InformationOutlineIcon
  },
  data () {
    return {
      isOpenDrawer: false
    }
  },
  computed: {
    isCustomWindowShadow () {
      return this.$store.state.Window.isCustomWindowShadow
    }
  },
  methods: {
    toggleDrawer () {
      this.isOpenDrawer = !this.isOpenDrawer
    },
    close () {
      this.$electron.remote.getCurrentWindow().close()
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.localStorage.setItem('init-state', true)
      window.addEventListener('storage', function (e) {
        if (e.key === 'full-state' && e.newValue) {
          this.$store.replaceState(JSON.parse(e.newValue))
          window.localStorage.removeItem('full-state')
          if (this.$store.state.Window.isPinned) {
            this.$electron.remote.getCurrentWindow().setAlwaysOnTop(true)
          }
        } else if (e.key === 'mutation-applied' && e.newValue) {
          const { type, payload } = JSON.parse(e.newValue)
          this.$store.commit(type, payload)
        }
      }.bind(this))
    }.bind(this))
  }
}
</script>

<style scoped>
#titlebar {
  min-height: 2rem;
  height: 2rem;
  background-color: #1d1d1d;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #000000;
}
#titlebar > * {
  color: #e2e2e2;
}

#title {
  flex: 1;
  height: 100%;
  padding: 0 0.8rem;
  font-size: 0.9rem;
  display: flex;
  font-weight: lighter;
  align-items: center;
  justify-content: center;
  text-transform:capitalize;
}

#menu-btn,
#close-btn {
  height: 100%;
  display: flex;
  align-items: center;
}
#menu-btn > span,
#close-btn > span {
  width: 2rem;
  display: flex;
  justify-content: center;
}
#menu-btn:hover {
  background-color: #363736;
}
#menu-btn >>> svg,
#close-btn >>> svg {
  width: 100%;
  height: 100%;
  padding: 0.55rem;
}
#close-btn:hover {
  background-color: #D41223;
}

#drawer {
  position: fixed;
  top: 2rem;
  z-index: 100;
  width: calc(100% - 4px);
  height: calc(100% - 2px - 2rem);
  display: flex;
  flex-direction: row;
}
.drawer-with-custom-shadow {
  top: calc(9px + 2rem) !important;
  width: calc(100% - 16px) !important;
  height: calc(100% - 17px - 2rem) !important;
}
#drawer-items {
  width: 8rem;
  display: flex;
  flex-direction: column;
  background-color: #000000dd;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
              0 16px 24px 2px rgba(0, 0, 0, 0.14),
              0 6px 30px 5px rgba(0, 0, 0, 0.12);
}
#drawer-items > div:first-child {
  margin-top: 0.3rem;
}
#drawer-items > div {
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: background-color 0.15s ease;
}
#drawer-items > div:hover {
  background-color: #3d3d3d;
}
#drawer-items > div:active {
  background-color: #6e6e6e;
}
#drawer-items >>> span {
  width: 2rem;
  display: flex;
  justify-content: center;
  margin-left: 0.5rem;
}
#drawer-items >>> svg {
  width: 100%;
  height: 100%;
  padding: 0.45rem;
}
#drawer-items >>> p {
  font-size: 0.8rem;
  font-weight: lighter;
}
#drawer-mask {
  flex: 1;
  background-color: #00000059;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.35s linear;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
