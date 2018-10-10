export default class Mpv {
  constructor (element) {
    this.mpv = element
  }

  playerReady () {
    const observable = [
      'pause',
      'time-pos',
      'duration',
      'eof-reached',
      'filename',
      'volume',
      'mpv-version',
      'ffmpeg-version'
    ]
    observable.forEach(v => this._setObserve(v))
    this._sendProperty('hwdec', 'auto')
  }
  loadFile (filePath) {
    this._sendCommand('loadfile', filePath)
  }
  goPlay (play) {
    this._sendProperty('pause', !play)
  }
  stop () {
    this._sendCommand('stop')
  }
  setVolume (volume) {
    this._sendProperty('volume', volume)
  }
  mute () {
    this._sendProperty('mute', true)
  }
  unmute () {
    this._sendProperty('mute', false)
  }
  seek (seconds, relative = false) {
    this._sendCommand('seek', seconds.toString(), relative ? 'relative' : 'absolute')
  }
  setTimePos (seconds) {
    this._sendProperty('time-pos', seconds.toString())
  }
  screenshot (includeSubtitles = true) {
    this._sendCommand('screenshot', includeSubtitles ? 'subtitles' : 'video', 'single')
  }
  stat () {
    this._sendCommand('keypress', 'I')
  }
  getMPVVersion () {
    this._getPropertyAsync('mpv-version')
  }
  getFFMPEGVersion () {
    this._getPropertyAsync('ffmpeg-version')
  }

  _sendCommand (cmd, ...args) {
    args = args.map(arg => arg.toString())
    this.mpv.postMessage({
      type: 'command',
      data: [cmd].concat(args)
    })
  }
  _sendProperty (name, value) {
    this.mpv.postMessage({
      type: 'set_property',
      data: { name, value }
    })
  }
  _setObserve (name) {
    this.mpv.postMessage({
      type: 'observe_property',
      data: name
    })
  }
  _getPropertyAsync (name) {
    this.mpv.postMessage({
      type: 'get_property_async',
      data: name
    })
  }
}
