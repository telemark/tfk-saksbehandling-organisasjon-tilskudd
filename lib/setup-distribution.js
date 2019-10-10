'use strict'

const miss = require('mississippi')
const escape = require('lodash.escape')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)

  logger('info', ['setup-distribution', item._id, item.brregData.navn])

  item.distribution = {
    _id: item._id,
    svarUtTitle: `Bekreftelse på mottatt søknad - ${escape(item.tiltak.navn)}`,
    documents: [],
    recipients: []
  }

  return callback(null, JSON.stringify(item))
})
