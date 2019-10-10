'use strict'

const fs = require('fs')
const miss = require('mississippi')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)
  const documents = item.documents || []

  if (item.errors.length > 0) {
    logger('info', ['cleanup-documents', item._id, item.brregData.navn, 'got errors'])

    documents.forEach(doc => {
      fs.unlinkSync(doc.document)
    })
  } else {
    logger('info', ['cleanup-documents', item._id, item.brregData.navn, 'no errors'])
    documents.forEach(doc => {
      if (!doc.distribution) {
        fs.unlinkSync(doc.document)
      }
    })
  }

  return callback(null, JSON.stringify(item))
})
