export default class mpv {
  static playerReady (el) {
    const observable = [
      'pause',
      'time-pos',
      'duration',
      'eof-reached',
      'filename',
      'volume',
      // 'aid',
      // 'hwdec-current',
      // 'chapters',
      // 'width',
      // 'height',
      // 'video-format',
      // 'seekable',
      'mpv-version',
      'ffmpeg-version'
    ]
    observable.forEach(v => this._setObserve(el, v))
    this._sendProperty(el, 'hwdec', 'auto')
  }
  static loadFile (el, filePath) {
    this._sendCommand(el, 'loadfile', filePath)
  }
  static goPlay (el, play) {
    this._sendProperty(el, 'pause', !play)
  }
  static stop (el) {
    this._sendCommand(el, 'stop')
  }
  static setVolume (el, volume) {
    this._sendProperty(el, 'volume', volume)
  }
  static mute (el) {
    this._sendProperty(el, 'mute', true)
  }
  static unmute (el) {
    this._sendProperty(el, 'mute', false)
  }
  static seek (el, seconds, relative = false) {
    this._sendCommand(el, 'seek', seconds.toString(), relative ? 'relative' : 'absolute')
  }
  static setTimePos (el, seconds) {
    this._sendProperty(el, 'time-pos', seconds.toString())
  }
  static screenshot (el, includeSubtitles = true) {
    this._sendCommand(el, 'screenshot-raw', includeSubtitles ? 'subtitles' : 'video', 'single')
  }
  static stat (el) {
    this._sendCommand(el, 'keypress', 'I')
  }
  static getMPVVersion (el) {
    this._getPropertyAsync(el, 'mpv-version')
  }
  static getFFMPEGVersion (el) {
    this._getPropertyAsync(el, 'ffmpeg-version')
  }

  static _sendCommand (el, cmd, ...args) {
    args = args.map(arg => arg.toString())
    el.postMessage({
      type: 'command',
      data: [cmd].concat(args)
    })
  }
  static _sendProperty (el, name, value) {
    el.postMessage({
      type: 'set_property',
      data: { name, value }
    })
  }
  static _setObserve (el, name) {
    el.postMessage({
      type: 'observe_property',
      data: name
    })
  }
  static _getPropertyAsync (el, name) {
    el.postMessage({
      type: 'get_property_async',
      data: name
    })
  }
}
