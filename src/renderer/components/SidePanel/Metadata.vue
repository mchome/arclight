<template>
  <div id="metadata">
  </div>
</template>

<script>
import getInfo from '../../mediainfo'

export default {
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
