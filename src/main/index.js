import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron'
const path = require('path')
const print = console.log

if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow

ipcMain.on('window-popup', (_, arg) => {
  if (arg === 'playlist') {
    createPlaylistWindow()
  } else if (arg === 'settings') {
    createSettingsWindow()
  } else if (arg === 'context-menu') {
    createContextMenuWindow()
  }
})

function createWindow () {
  mainWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    width: 400,
    height: 400,
    minWidth: 400,
    minHeight: 400,
    useContentSize: true,
    webPreferences: {
      plugins: true
    }
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

  globalShortcut.register('MediaPlayPause', () => {
    mainWindow.webContents.send('global-key-event', 'toggle-play')
  })
  globalShortcut.register('MediaPreviousTrack', () => {
    mainWindow.webContents.send('global-key-event', 'go-previous')
  })
  globalShortcut.register('MediaNextTrack', () => {
    mainWindow.webContents.send('global-key-event', 'go-next')
  })

  // for testing
  mainWindow.setPosition(960, 10)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createPlaylistWindow () {
  const window = new BrowserWindow({
    frame: false,
    // transparent: true,
    width: 400,
    height: 400,
    minWidth: 400,
    minHeight: 400,
    useContentSize: true
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/Playlist`
    : `file://${__dirname}/index.html#Playlist`

  // for testing
  window.setPosition(940, 30)

  window.loadURL(winURL)
}

function createSettingsWindow () {}

function createContextMenuWindow () {}

let pluginPath = path.join(__static, 'mpv.js/mpvjs.node;application/x-mpvjs').split('\\').join('/')
if (process.env.NODE_ENV === 'production') {
  pluginPath = pluginPath.replace('app.asar', 'app.asar.unpacked')
}
app.commandLine.appendSwitch('ignore-gpu-blacklist')
app.commandLine.appendSwitch('register-pepper-plugins', pluginPath)

app.on('ready', createWindow)

app.on('web-contents-created', (_, contents) => {
  contents.on('new-window', (_, navigationUrl) => {
    print(`url: ${navigationUrl}`)
  })
})

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll()

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
