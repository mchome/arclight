const fs = require('fs')
const path = require('path')

export default class drive {
  static parseFiles (entries) {
    let files = []

    for (let file of entries) {
      if (fs.statSync(file.path).isFile()) {
        files.push(file.path)
      } else {
        fs.readdirSync(file.path).forEach((f) => {
          if (fs.statSync(path.join(file.path, f)).isFile()) {
            files.push(path.join(file.path, f))
          }
        })
      }
    }

    return files
  }
}
