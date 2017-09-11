'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')
const logger = require('./logger')
const isJsonFile = file => file.indexOf('.json') > -1

module.exports = miss.through((chunck, encoding, callback) => {
  const jobs = fs.readdirSync(config.JOB_DIRECTORY_PATH).filter(isJsonFile)
  let item

  logger('info', ['get-next-job', 'start'])

  if (jobs.length > 0) {
    item = fs.readFileSync(config.JOB_DIRECTORY_PATH + '/' + jobs[0])
    logger('info', ['get-next-job', 'got job', item._id])
    return callback(null, item.toString())
  } else {
    logger('info', ['get-next-job', 'no jobs in queue'])
    process.exit(0)
  }
})
