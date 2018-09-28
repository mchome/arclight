<template>
  <div id="metadata">
    <titlebar>
      <p slot="title">Metadata</p>
    </titlebar>
  </div>
</template>

<script>
import Titlebar from './Common/Titlebar'

import getInfo from '../mediainfo'

export default {
  components: {
    Titlebar
  },
  computed: {
  },
  methods: {
  },
  mounted () {
    getInfo('')
  }
}
</script>

<style>
#metadata {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
