# Arclight

> A video player (WIP) based on mpv.js (libmpv).

## Build Setup

1) grab `mpvjs.node` from https://github.com/Kagami/mpv.js/releases
2) grab `mpv-1.dll` from libmpv
3) drop `mpvjs.node` and `mpv-1.dll` to `static/mpv.js/` folder
4) drop `youtube-dl` binary to top-level of project
    (If you want to support youtube or other video site witch supported by youtube-dl)
5) build it

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[16fb2b9](https://github.com/SimulatedGREG/electron-vue/tree/16fb2b963f17318cd9ff17d2adfd1945bd7107a0) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

![image](https://user-images.githubusercontent.com/7392658/45912587-64a80d00-be56-11e8-8ac4-943aef18362f.png)
