<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'arclight'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: Roboto, Lato, Helvetica, "Monaco", "Avenir", "Segoe UI",
    "Microsoft YaHei", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: default;
  user-select: none;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

#app {
  height: calc(100% - 4px);
  border: 2px solid #000000;
}
</style>
