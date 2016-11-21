'use strict'

const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  console.log(`${item._id}: setup-distribution - ${item.brregData.navn}`)

  item.distribution = {
    '_id': item._id,
    svarUtTitle: `Bekreftelse på mottatt søknad - ${item.tiltak.navn}`,
    documents: [],
    recipients: []
  }

  return callback(null, JSON.stringify(item))
})
