'use strict'

const fs = require('fs')
const miss = require('mississippi')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)

  const documents = item.documents || []
  let documentsToArchive = item.archive.documents

  logger('info', ['encode-documents-to-archive', item._id, item.brregData.navn])

  documents.forEach(doc => {
    const document = fs.readFileSync(doc.document)
    documentsToArchive.push({
      title: doc.title,
      offTitle: doc.offTitle,
      data: document.toString('base64'),
      type: doc.type,
      role: doc.role
    })
  })

  return callback(null, JSON.stringify(item))
})
