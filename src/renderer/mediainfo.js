const { spawn } = require('child_process')

function getInfo (file) {
  const command = spawn('mediainfo', ['--Full', '--Output=XML', file])
  command.stdout().on('data', data => {
    console.log(data)
  })
}

export default {
  getInfo
}
