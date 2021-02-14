import * as path from 'path'
import * as electron from 'electron'
import teeny from 'teeny-conf'

const { remote } = electron
const { app } = remote

/*
|--------------------------------------------------------------------------
| General variables
|--------------------------------------------------------------------------
*/

export const pathUserData = app.getPath('userData')
export const pathSrc = __dirname

/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
*/

// eslint-disable-next-line new-cap
export const config = new teeny(path.join(pathUserData, 'config.json'))
