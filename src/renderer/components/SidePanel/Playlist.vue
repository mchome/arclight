<template>
  <div id="playlist">
    <ul id="filelist">
      <li class="filename"
        v-for="(file, index) in fileList"
        :key="file.id"
        :index="index"
        :class="{ 'active': (index === order) }"
        @dblclick="setOrder(index)">
        {{ file.base }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    fileList: {
      get () {
        const files = this.$store.state.Player.fileList
        return files.map(file => ({
          base: require('path').basename(file),
          full: file
        }))
      }
    },
    order: {
      get () {
        return this.$store.state.Player.order
      }
    }
  },
  methods: {
    setOrder (order) {
      this.$store.renderDispatch('setOrder', order)
    }
  }
}
</script>

<style scoped>
#playlist {
  height: calc(100vh - 2rem - 1.2rem - 5px);
  display: flex;
  margin: 0.6rem 0;
}

#filelist {
  width: calc(100% - 4px);
  overflow: auto;
}
#filelist::-webkit-scrollbar {
	width: 0.5rem;
}
#filelist::-webkit-scrollbar-thumb {
  background-color: #e2e2e2;
	border-radius: 0.5rem;
}

.filename:first-child {
  margin-top: 0;
}
.filename {
  font-size: 0.9rem;
  font-weight: lighter;
  white-space: nowrap;
  letter-spacing: 0.3px;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
  padding: 0.6rem 0.6rem;
  margin-right: 0.32rem;
  transition: all 0.2s ease;
}
.filename:hover {
  color: #0f0f0f;
  font-weight: normal;
  background-color: #888888;
}
.filename:active {
  color: #0f0f0f;
  font-weight: normal;
  background-color: #b3b3b3;
}

.active {
  color: #0f0f0f;
  font-weight: normal;
  background-color: #e2e2e2;
}
</style>
