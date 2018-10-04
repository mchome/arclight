<template>
  <div id="controller">
    <div id="controller-slider">
      <input id="progress-bar"
        class="slider"
        type="range"
        step="0.1"
        v-model="seek"
        min="0"
        :max="duration"
        @mousedown="seeking(true)"
        @mouseup="seeking(false)"
      />
      <volume-high-icon :class="{ disabled: isMute }" @click.native="toggleMute" :title="isMute ? 'Unmute' : 'Mute'" />
      <input id="volume-bar"
        class="slider"
        type="range"
        step="1"
        v-model="volume"
        min="0"
        max="100"
      />
    </div>

    <div id="controller-btns">
      <play-icon v-show="!isPlaying"
        @click.left.native="togglePlay"
        @click.right.native="stopPlaying"
        title="Play/Stop" />
      <pause-icon v-show="isPlaying"
        @click.left.native="togglePlay"
        @click.right.native="stopPlaying"
        title="Pause/Stop" />
      <skip-previous-icon
        @click.left.native="playPrevious"
        @click.right.native="playBackward"
        title="Previous/Backward" />
      <skip-next-icon
        @click.left.native="playNext"
        @click.right.native="playForward"
        title="Next/Forward" />
      <div id="label" class="draggable" v-show="!isFullscreen && !isMaximize">
        <p>{{ translateTime(seek) }} / {{ translateTime(duration) }}</p>
      </div>
      <div id="label" v-show="isFullscreen || isMaximize">
        <p>{{ translateTime(seek) }} / {{ translateTime(duration) }}</p>
      </div>
      <subtitles-icon title="Select subtitles"></subtitles-icon>
      <watermark-icon :class="{ disabled: !isSidePanelOpened }" @click.native="popupSidePanel" title="Side Panel"></watermark-icon>
    </div>
  </div>
</template>

<script>
import VolumeHighIcon from 'icons/VolumeHigh'
import PlayIcon from 'icons/Play'
import PauseIcon from 'icons/Pause'
import SkipNextIcon from 'icons/SkipNext'
import SkipPreviousIcon from 'icons/SkipPrevious'
import SubtitlesIcon from 'icons/Subtitles'
import WatermarkIcon from 'icons/Watermark'

export default {
  components: {
    VolumeHighIcon,
    PlayIcon,
    PauseIcon,
    SkipNextIcon,
    SkipPreviousIcon,
    SubtitlesIcon,
    WatermarkIcon
  },
  watch: {
    seek () {
      const percent = this.seek / this.duration
      document.getElementById('progress-bar')
        .style.setProperty('--percent', percent * 100 + '%')
    },
    volume () {
      const percent = this.volume / 100
      document.getElementById('volume-bar')
        .style.setProperty('--percent', percent * 100 + '%')
    }
  },
  computed: {
    isMute () {
      return this.$store.state.Player.isMute
    },
    isPlaying () {
      return this.$store.state.Player.isPlaying
    },
    volume: {
      get () {
        return this.$store.state.Player.volume
      },
      set (value) {
        this.$store.dispatch('setVolume', value)
      }
    },
    seek: {
      get () {
        return this.$store.state.Player.seek
      },
      set (value) {
        this.$store.dispatch('seek', value)
      }
    },
    duration () {
      return this.$store.state.Player.duration
    },
    isFullscreen () {
      return this.$store.state.Window.isFullscreen
    },
    isMaximize () {
      return this.$store.state.Window.isMaximize
    },
    isSidePanelOpened () {
      return this.$store.state.Window.isSidePanelOpened
    }
  },
  methods: {
    toggleMute () {
      this.$store.dispatch('toggleMute')
    },
    togglePlay () {
      this.$store.dispatch('togglePlay')
    },
    stopPlaying () {
      this.$store.dispatch('stop')
    },
    playPrevious () {
      this.$store.dispatch('goPrevious')
    },
    playNext () {
      this.$store.dispatch('goNext')
    },
    playBackward () {
      this.$store.dispatch('goBackward')
    },
    playForward () {
      this.$store.dispatch('goForward')
    },
    seeking (isSeeking) {
      this.$store.dispatch('seeking', isSeeking)
    },
    translateTime (time) {
      let h = Math.floor(time / 3600)
      let m = Math.floor((time - h * 3600) / 60)
      let s = Math.floor(time - h * 3600 - m * 60)
      if (h < 10) { h = '0' + h }
      if (m < 10) { m = '0' + m }
      if (s < 10) { s = '0' + s }

      return `${h}:${m}:${s}`
    },
    popupSidePanel () {
      this.$electron.ipcRenderer.send('window-popup', 'side-panel')
    }
  }
}
</script>

<style scoped>
#controller {
  height: 4rem;
  background-color: #1d1d1d;
  display: flex;
  flex-direction: column;
  z-index: 4;
  opacity: 1.0;
  transition: all 0.2s cubic-bezier(0.215, 0.610, 0.355, 1);
}

#controller-slider > * {
  color: #b1b1b1;
  transition: all 0.2s ease;
}
#controller-btns > * {
  color: #e2e2e2;
  transition: all 0.2s ease;
}

#controller-slider {
  flex: 1;
  display: flex;
  align-items: center;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
}

#controller-btns {
  flex: 2;
  display: flex;
  align-items: center;
}
#controller-btns > span {
  width: 3rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #000000;
}
#controller-btns > span:last-child {
  border: none !important;
}
#controller-btns >>> svg {
  width: 100%;
  padding: 0.5rem 1rem;
}

#controller-slider > span {
  display: flex;
  justify-content: center;
  align-items: center;
}
#controller-slider >>> svg {
  transform: scale(0.6);
}

#progress-bar {
  --percent: 0%;
  flex: 1;
  margin: 0 0.5rem;
}
#volume-bar {
  --percent: 0%;
  width: 5rem;
  margin-right: 0.5rem;
}

.slider {
  -webkit-appearance: none;
  background-color: transparent;
}
.slider:focus {
  outline: none;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
  background-color: #e2e2e2;
  transform: translateY(-3.75px);
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
.slider::-webkit-slider-runnable-track {
  background-color: #000000;
  height: 3px;
  margin: 0.6rem 0;
  border-radius: 3px;
}
#progress-bar::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #a7eb21 var(--percent),#000000 var(--percent));
}
#volume-bar::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #a7eb21 var(--percent),#000000 var(--percent));
}

#label {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  border-right: 1px solid #000000;
  width: 100%;
  height: 100%;
}
#label > p {
  color: #b1b1b1;
}

.disabled {
  color: #666666 !important;
}
</style>
