'use strict'

const miss = require('mississippi')
const createPdfFromTemplate = require('tfk-template-to-pdf')
const uniqueFilename = require('tfk-generate-unique-filename')
const config = require('../config')
const logger = require('./logger')

module.exports = miss.through(function (chunck, encoding, callback) {
  let item = JSON.parse(chunck)
  let documents = item.documents || []
  let documentsForDistribution = item.distribution.documents
  let templates = item.documentTemplates || []

  const areWeDoneYet = () => {
    if (templates.length > 0) {
      next()
    } else {
      return callback(null, JSON.stringify(item))
    }
  }

  const next = () => {
    const document = templates.pop()
    const prefix = document.distribution ? config.DISTRIBUTION_DIRECTORY_PATH : config.JOB_DIRECTORY_PATH
    const documentPath = `${prefix}/${uniqueFilename('.pdf')}`
    const options = {
      templateData: document.data,
      templateFilepath: document.template,
      documentFilepath: documentPath,
      pdfServiceUrl: config.PDF_SERVICE_URL
    }
    createPdfFromTemplate(options, (error, data) => {
      if (error) {
        logger('error', ['generate-documents', error])
        item.errors.push(error.toString())
      } else {
        const doc = {
          title: document.title,
          offTitle: document.offTitle,
          type: document.type,
          document: documentPath,
          distribution: document.distribution,
          role: document.role
        }
        documents.push(doc)
        if (document.distribution) {
          doc.filsti = documentPath
          doc.mimetype = 'application/pdf'
          documentsForDistribution.push(doc)
        }
      }
      areWeDoneYet()
    })
  }

  logger('info', ['generate-documents', item._id, item.brregData.navn])

  if (templates) {
    next()
  } else {
    return callback(null, JSON.stringify(item))
  }
})
