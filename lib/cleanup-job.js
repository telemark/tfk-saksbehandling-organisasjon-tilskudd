'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)
  const fileName = config.JOB_DIRECTORY_PATH + '/' + item._id + '.json'

  console.log(item._id + ': cleanup-job')

  fs.unlinkSync(fileName)

  return callback(null, JSON.stringify(item))
})
