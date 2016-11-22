'use strict'

const fs = require('fs')
const miss = require('mississippi')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  const documents = item.documents || []
  var documentsToArchive = item.archive.documents

  console.log(`${item._id}: encode-documents-to-archive - ${item.brregData.navn}`)

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
