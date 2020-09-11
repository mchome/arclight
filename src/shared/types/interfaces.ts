/**
 * Config
 */
export interface ConfigBounds {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface Config {
  volume: number;
  muted: boolean;
  playbackRate: number;
  autoPlay: boolean;
  autoUpdate: boolean;
  bounds: ConfigBounds;
}
