import { BrowserWindow } from 'electron'

function createSidePanelWindow (onClosed) {
  const window = new BrowserWindow({
    frame: false,
    transparent: true,
    width: 300,
    height: 400,
    minWidth: 250,
    minHeight: 250,
    maximizable: false,
    useContentSize: true
  })

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/panel/${window.id}`
    : `file://${__dirname}/index.html#panel/${window.id}`

  window.loadURL(winURL)

  window.on('closed', () => onClosed())

  return window
}

function createContextMenuWindow () { }

export default {
  createSidePanelWindow,
  createContextMenuWindow
}
