<template>
  <div id="metadata">
    <titlebar>
      <p slot="title">Metadata</p>
    </titlebar>
  </div>
</template>

<script>
import Titlebar from './Common/Titlebar'

export default {
  components: {
    Titlebar
  },
  computed: {
  },
  methods: {
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
