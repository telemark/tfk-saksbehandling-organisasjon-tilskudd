'use strict'

const fs = require('fs')
const isFile = require('is-file')

module.exports = function cleanupFiles (options) {
  const seneca = this

  seneca.add('role: cleanup, cmd: cleanup-files', (args, callback) => {
    const files = args.files
    var deleted = []

    files.forEach((filePath) => {
      if (isFile(filePath)) {
        fs.unlinkSync(filePath)
        deleted.push(filePath)
      }
    })

    seneca.act('role: info, info: cleanup-files', {deletedFiles: deleted})
  })

  return options.tag || 'cleanup-files'
}
