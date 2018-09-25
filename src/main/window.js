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

function createSettingsWindow (onClosed) {
  const window = new BrowserWindow({
    frame: false,
    transparent: true,
    width: 400,
    height: 400,
    resizable: false,
    useContentSize: true
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/Settings/${window.id}`
    : `file://${__dirname}/index.html#Settings/${window.id}`

  window.loadURL(winURL)

  window.on('closed', () => onClosed())

  return window
}

function createMetadataWindow (onClosed) {
  const window = new BrowserWindow({
    frame: false,
    transparent: true,
    width: 400,
    height: 400,
    resizable: false,
    useContentSize: true
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/Metadata/${window.id}`
    : `file://${__dirname}/index.html#Metadata/${window.id}`

  window.loadURL(winURL)

  window.on('closed', () => onClosed())

  return window
}

function createAffectWindow (onClosed) {
  const window = new BrowserWindow({
    frame: false,
    transparent: true,
    width: 400,
    height: 400,
    resizable: false,
    useContentSize: true
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/Affect/${window.id}`
    : `file://${__dirname}/index.html#Affect/${window.id}`

  window.loadURL(winURL)

  window.on('closed', () => onClosed())

  return window
}

function createAboutWindow (onClosed) {
  const window = new BrowserWindow({
    frame: false,
    transparent: true,
    width: 400,
    height: 300,
    resizable: false,
    useContentSize: true
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/About/${window.id}`
    : `file://${__dirname}/index.html#About/${window.id}`

  window.loadURL(winURL)

  window.on('closed', () => onClosed())

  return window
}

function createContextMenuWindow () { }

export default {
  createPlaylistWindow,
  createSettingsWindow,
  createMetadataWindow,
  createAffectWindow,
  createAboutWindow,
  createContextMenuWindow
}
