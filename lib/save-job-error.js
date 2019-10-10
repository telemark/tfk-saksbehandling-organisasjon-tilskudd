'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)
  const fileName = config.ERROR_DIRECTORY_PATH + '/' + item._id + '.json'

  if (item.errors.length > 0) {
    logger('info', ['save-job-error', item._id, item.brregData.navn, 'errors', item.errors.length])
    fs.writeFileSync(fileName, JSON.stringify(item, null, 2))
  } else {
    logger('info', ['save-job-error', item._id, item.brregData.navn, 'no errors found'])
  }

  return callback(null, JSON.stringify(item))
})
