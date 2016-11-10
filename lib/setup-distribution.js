'use strict'

const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  console.log(item._id + ': ' + item.brregData.navn)
  console.log(item._id + ': setup-distribution')

  item.distribution = {
    '_id': item._id,
    svarUtTitle: config.SVARUT_TITLE,
    documents: [],
    recipients: []
  }

  return callback(null, JSON.stringify(item))
})
