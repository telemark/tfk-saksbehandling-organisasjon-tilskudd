'use strict'

const fs = require('fs')
const miss = require('mississippi')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  const documents = item.documents || []

  if (item.errors.length > 0) {
    console.log(`${item._id}: cleanup-documents on error - ${item.brregData.navn}`)

    documents.forEach(function (doc) {
      fs.unlinkSync(doc.document)
    })
  } else {
    console.log(`${item._id}: cleanup-documents on success - ${item.brregData.navn}`)

    documents.forEach(doc => {
      if (!doc.distribution) {
        fs.unlinkSync(doc.document)
      }
    })
  }

  return callback(null, JSON.stringify(item))
})
