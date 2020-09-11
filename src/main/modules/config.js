import * as path from 'path'
import * as electron from 'electron'
import teeny from 'teeny-conf'

const { app } = electron

class ConfigModule {

  constructor() {
    this.workArea = electron.screen.getPrimaryDisplay().workArea
  }

  async load() {
    const defaultConfig = this.getDefaultConfig()
    const userDataPath = app.getPath('userData')

    // eslint-disable-next-line new-cap
    this.conf = new teeny(path.join(userDataPath, 'config.json'), defaultConfig)

    // check if config update
    let configChanged = false

    Object.keys(defaultConfig).forEach((key) => {
      if (this.conf && this.conf.get(key) === undefined) {
        this.conf.set(key, defaultConfig[key])
        configChanged = true
      }
    })

    // save config if changed
    if (configChanged) {
      this.conf.save()
    }
  }

  getDefaultConfig() {
    const config = {
      volume: 100,
      muted: false,
      playbackRate: 1,
      autoPlay: false,
      autoUpdate: true,
      bounds: {
        width: 400,
        height: 400,
        x: Math.round(this.workArea.width / 2),
        y: Math.round(this.workArea.height / 2)
      }
    }

    return config
  }

  getConfig() {
    if (!this.conf) {
      throw new Error('Config not loaded.')
    }

    return this.conf.get()
  }

  get(key) {
    if (!this.conf) {
      throw new Error('Config not loaded.')
    }

    return this.conf.get(key)
  }

  reload() {
    if (!this.conf) {
      throw new Error('Config not loaded.')
    }

    this.conf.reload()
  }

  save() {
    if (!this.conf) {
      throw new Error('Config not loaded.')
    }

    this.conf.save()
  }
}

export default ConfigModule
