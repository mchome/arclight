<template>
  <div id="playlist">
    <ul id="filelist" @dragover.prevent @drop="loadFile">
      <li class="filename"
        v-for="(file, index) in fileList"
        :key="file.id"
        :index="index"
        :class="{ 'active': (index === order) }"
        @dblclick="setOrder(index)">
        <span>{{ index + 1 + "." }} {{ file.base }}</span>
        <span>{{ file.full }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import drive from '../../drive'

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
  watch: {
    order () { this.focusEl() }
  },
  methods: {
    loadFile (e) {
      e.preventDefault()
      let files = []

      files = files.concat(drive.parseFiles(e.dataTransfer.files))

      const urls = e.dataTransfer.getData('text')
      if (urls.length) {
        files = files.concat(urls.split(/\r?\n/))
      }

      if (files.length) {
        this.$store.renderDispatch('loadFiles', files)
      }
    },
    setOrder (order) {
      this.$store.renderDispatch('setOrder', order)
    },
    focusEl (microseconds = 100) {
      setTimeout(() => {
        const el = document.querySelectorAll('.active')
        if (el.length) {
          el[0].scrollIntoView({ behavior: 'smooth' })
        }
      }, microseconds)
    }
  },
  mounted () {
    this.focusEl(300)
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
  font-size: 0.8rem;
  font-weight: lighter;
  white-space: nowrap;
  letter-spacing: 0.3px;
  overflow-x: hidden;
  display: flex;
  margin: 0.3rem 0;
  padding: 0.6rem 0.3rem;
  margin-right: 0.32rem;
  transition: all 0.2s linear;
  flex-direction: column;
}
.filename:hover {
  font-weight: normal;
  color: #0f0f0f;
  background-color: #888888;
}
.filename:active {
  font-weight: normal;
  color: #0f0f0f;
  background-color: #b3b3b3;
}
.filename > span:last-child {
  font-size: 0.55rem;
  margin-left: 1rem;
}

.active {
  color: #0f0f0f;
  font-weight: normal;
  background-color: #e2e2e2;
}
</style>
