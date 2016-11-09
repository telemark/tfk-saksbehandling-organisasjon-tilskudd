'use strict'

const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': ' + item.brregData.navn)
  console.log(item._id + ': setup-item')

  item.errors = []
  item.distribution = {
    '_id': item._id,
    documentCreated: item.timeStamp,
    documents: [],
    documentTemplates: [],
    recipientOrganizationNumber: item.brregData.orgnr,
    recipientName: item.brregData.navn,
    svarUtTitle: config.SVARUT_TITLE
  }
  item.documentTemplates = []
  item.documents = []

  return callback(null, JSON.stringify(item))
})
