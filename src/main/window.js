import { BrowserWindow } from 'electron'

function createPlaylistWindow (onClosed) {
  const window = new BrowserWindow({
    frame: false,
    transparent: true,
    width: 400,
    height: 400,
    resizable: false,
    maximizable: false,
    useContentSize: true
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/panel/playlist/${window.id}`
    : `file://${__dirname}/index.html#panel/playlist/${window.id}`

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
    maximizable: false,
    useContentSize: true
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/panel/settings/${window.id}`
    : `file://${__dirname}/index.html#panel/settings/${window.id}`

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
    maximizable: false,
    useContentSize: true
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/panel/metadata/${window.id}`
    : `file://${__dirname}/index.html#panel/metadata/${window.id}`

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
    maximizable: false,
    useContentSize: true
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/panel/affect/${window.id}`
    : `file://${__dirname}/index.html#panel/affect/${window.id}`

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
    maximizable: false,
    useContentSize: true
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/panel/about/${window.id}`
    : `file://${__dirname}/index.html#panel/about/${window.id}`

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
  maximizable: false,
  createContextMenuWindow
}
