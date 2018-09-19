<template>
  <div id="controller">
    <div id="controller-slider">
      <input type="range" id="progress" min="0" max="10" />
      <volume-high-icon v-if="!isMute" @click.native="toggleMute" title="Mute" />
      <volume-off-icon v-if="isMute" @click.native="toggleMute" title="Unmute" />
      <input type="range" id="volume" min="0" max="10" />
    </div>
    <div id="controller-btns">
      <play-icon v-if="!isPlaying" @click.left.native="togglePlay" @click.right.native="stopPlaying" title="Play" />
      <pause-icon v-if="isPlaying" @click.left.native="togglePlay" @click.right.native="stopPlaying" title="Pause" />
      <skip-previous-icon @click.native="playPrevious" title="Previous" />
      <skip-next-icon @click.native="playNext" title="Next" />
    </div>
  </div>
</template>

<script>
import VolumeHighIcon from 'icons/VolumeHigh'
import VolumeOffIcon from 'icons/VolumeOff'
import PlayIcon from 'icons/Play'
import PauseIcon from 'icons/Pause'
import SkipNextIcon from 'icons/SkipNext'
import SkipPreviousIcon from 'icons/SkipPrevious'

export default {
  components: {
    VolumeHighIcon,
    VolumeOffIcon,
    PlayIcon,
    PauseIcon,
    SkipNextIcon,
    SkipPreviousIcon
  },
  computed: {
    isMute () {
      return this.$store.state.Player.isMute
    },
    isPlaying () {
      return this.$store.state.Player.isPlaying
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
      print('stop')
    },
    playPrevious () {
      print('prv')
    },
    playNext () {
      print('next')
    }
  }
}
</script>

<style>
#controller {
  height: 4rem;
  background-color: #1d1d1d;
  display: flex;
  flex-direction: column;
}

#controller-slider > *,
#controller-btns > * {
  color: #e2e2e2;
}

#controller-slider {
  flex: 1;
  display: flex;
  align-items: center;
}

#controller-btns {
  flex: 3;
  display: flex;
  align-items: center;
}
#controller-btns > span {
  width: 2rem;
  display: flex;
  justify-content: center;
}
#controller-btns svg {
  transform: scale(0.75);
}

#progress {}

#volume {}
</style>
