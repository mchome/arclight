import { BrowserWindow } from 'electron'

function createPlaylistWindow (onClosed) {
  const window = new BrowserWindow({
    frame: false,
    transparent: true,
    width: 400,
    height: 400,
    resizable: false,
    useContentSize: true
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/Playlist/${window.id}`
    : `file://${__dirname}/index.html#Playlist/${window.id}`

  window.loadURL(winURL)

  window.on('closed', () => onClosed())

  return window
}

function createSettingsWindow () { }
function createMetadataWindow () { }
function createAffectWindow () { }
function createAboutWindow () { }

function createContextMenuWindow () { }

export default {
  createPlaylistWindow,
  createSettingsWindow,
  createMetadataWindow,
  createAffectWindow,
  createAboutWindow,
  createContextMenuWindow
}
