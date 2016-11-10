'use strict'

const miss = require('mississippi')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  console.log(item._id + ': ' + item.brregData.navn)
  console.log(item._id + ': setup-item')

  item.errors = []
  item.documentTemplates = []
  item.documents = []

  return callback(null, JSON.stringify(item))
})
