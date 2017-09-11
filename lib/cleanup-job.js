'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)
  const fileName = config.JOB_DIRECTORY_PATH + '/' + item._id + '.json'

  logger('info', ['cleanup-job', item._id, item.brregData.navn])

  fs.unlinkSync(fileName)

  return callback(null, JSON.stringify(item))
})
