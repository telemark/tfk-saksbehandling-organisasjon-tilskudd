'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)
  const fileName = config.DONE_DIRECTORY_PATH + '/' + item._id + '.json'

  if (item.errors.length === 0) {
    logger('info', ['save-jobs-done', item._id, item.brregData.navn, 'no errora'])
    fs.writeFileSync(fileName, JSON.stringify(item, null, 2))
  } else {
    logger('warn', ['save-jobs-done', item._id, item.brregData.navn, 'errors', item.errors.length])
  }

  return callback(null, JSON.stringify(item))
})
