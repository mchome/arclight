<template>
  <div id="titlebar">
    <div id="title">
      <p>Arclight</p>
    </div>

    <div id="media-title" class="draggable">
      <p>{{ fileName }}</p>
    </div>

    <div id="command-btns">
      <window-close-icon id="close-btn" @click.native="close" title="Close" />
    </div>
  </div>
</template>

<script>
import WindowCloseIcon from 'icons/WindowClose'

export default {
  components: {
    WindowCloseIcon
  },
  computed: {
    fileName () {
      return this.$store.state.Player.fileName
    },
    winid () {
      return parseInt(this.$route.params.winid)
    }
  },
  methods: {
    togglePin () {
      this.$store.dispatch('togglePin')
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
#command-btns svg {
  width: 100%;
  height: 100%;
  padding: 0.55rem;
}
#close-btn:hover {
  background-color: #D41223 !important;
}
</style>
