const { autoUpdater } = require('electron-updater')

exports.checkForUpdatesAndNotify = function () {
  autoUpdater.checkForUpdatesAndNotify()
}
