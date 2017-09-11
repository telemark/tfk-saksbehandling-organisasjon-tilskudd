'use strict'

const miss = require('mississippi')
const normalizeContact = require('tfk-dsf-normalize-contact')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)

  logger('info', ['setup-item', item._id, item.brregData.navn])

  item.dsfContact = normalizeContact(item.dsfData)
  item.errors = []
  item.documentTemplates = []
  item.documents = []

  return callback(null, JSON.stringify(item))
})
