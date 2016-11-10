'use strict'

const miss = require('mississippi')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  console.log(`${item._id}: setup-item - ${item.brregData.navn}`)

  item.errors = []
  item.documentTemplates = []
  item.documents = []

  return callback(null, JSON.stringify(item))
})
