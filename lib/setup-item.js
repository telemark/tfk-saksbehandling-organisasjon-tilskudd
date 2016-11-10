'use strict'

const miss = require('mississippi')
const normalizeContact = require('tfk-dsf-normalize-contact')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  console.log(`${item._id}: setup-item - ${item.brregData.navn}`)

  item.dsfContact = normalizeContact(item.dsfData)
  item.errors = []
  item.documentTemplates = []
  item.documents = []

  return callback(null, JSON.stringify(item))
})
