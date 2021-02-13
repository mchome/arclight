import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import ConfigModule from './modules/config'
import { autoUpdater } from 'electron-updater'
const path = require('path')
const {
  createSidePanelWindow,
  createContextMenuWindow
} = require('./window').default
// const print = console.log

if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let popupWindow = []

ipcMain.on('window-popup', (_, arg) => {
  const popped = popupWindow.filter(i => i.arg === arg)
  if (popped.length > 0) {
    popped[0].win.close()
    mainWindow.webContents.send('window-opened', JSON.stringify(popupWindow))
    return
  }

  if (arg === 'side-panel') {
    const win = createSidePanelWindow(() => {
      popupWindow.splice(popupWindow.indexOf(arg), 1)
      mainWindow.webContents.send('window-opened', JSON.stringify(popupWindow))
    })
    popupWindow.push({ arg, win })
  } else if (arg === 'context-menu') {
    const win = createContextMenuWindow(() => {
      popupWindow.splice(popupWindow.indexOf(arg), 1)
      mainWindow.webContents.send('window-opened', JSON.stringify(popupWindow))
    })
    popupWindow.push({ arg, win })
  }

  mainWindow.webContents.send('window-opened', JSON.stringify(popupWindow))
})

async function createWindow () {
  const configModule = new ConfigModule()
  await configModule.load()

  mainWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    width: 400,
    height: 400,
    minWidth: 400,
    minHeight: 400,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      plugins: true
    }
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/player/1`
    : `file://${__dirname}/index.html#player/1`

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
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}

let os
switch (process.platform) {
  case 'darwin':
    os = 'mac'
    break
  case 'win32':
    os = 'win'
    break
}

let pluginPath = path.join(__static, 'mpv.js', os, 'mpvjs.node;application/x-mpvjs').split('\\').join('/')
if (process.env.NODE_ENV === 'production') {
  pluginPath = pluginPath.replace('app.asar', 'app.asar.unpacked')
}

app.commandLine.appendSwitch('ignore-gpu-blacklist')
app.commandLine.appendSwitch('register-pepper-plugins', pluginPath)

app.on('ready', createWindow)

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
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') {
    autoUpdater.checkForUpdates()
  }
})
