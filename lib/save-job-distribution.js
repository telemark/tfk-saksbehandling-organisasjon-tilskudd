'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)
  const fileName = config.DISTRIBUTION_DIRECTORY_PATH + '/' + item._id + '.json'

  if (item.errors.length === 0) {
    logger('info', ['save-job-distribution', item._id, item.brregData.navn, 'no errors'])
    fs.writeFileSync(fileName, JSON.stringify(item.distribution, null, 2))
  } else {
    logger('warn', ['save-job-distribution', item._id, item.brregData.navn, 'errors', item.errors.length])
  }

  return callback(null, JSON.stringify(item))
})
