'use strict'

module.exports = (item, callback) => {
  const miss = require('mississippi')
  const getNextJob = require('./lib/get-next-job')
  const setupItem = require('./lib/setup-item')
  const setupDistribution = require('./lib/setup-distribution')
  const setupRecipients = require('./lib/setup-recipients')
  const setupTemplates = require('./lib/setup-templates')
  const setupArchive = require('./lib/setup-archive')
  const generateDocuments = require('./lib/generate-documents')
  const encodeDocumentsArchive = require('./lib/encode-documents-to-archive')
  const saveJobArchive = require('./lib/save-job-archive')
  const saveJobDistribution = require('./lib/save-job-distribution')
  const saveJobDone = require('./lib/save-job-done')
  const saveJobError = require('./lib/save-job-error')
  const cleanupDocuments = require('./lib/cleanup-documents')
  const cleanupJob = require('./lib/cleanup-job')
  const starter = fromString(JSON.stringify(item))

  function fromString (string) {
    return miss.from(function (size, next) {
      if (string.length <= 0) return next(null, null)

      var chunk = string.slice(0, size)
      string = string.slice(size)

      next(null, chunk)
    })
  }

  function finished (error) {
    if (error) {
      callback(error, null)
    } else {
      callback(null, {message: 'Success'})
    }
  }
  miss.pipe(
    starter,
    getNextJob,
    setupItem,
    setupDistribution,
    setupRecipients,
    setupTemplates,
    setupArchive,
    generateDocuments,
    encodeDocumentsArchive,
    saveJobArchive,
    saveJobDistribution,
    saveJobDone,
    saveJobError,
    cleanupDocuments,
    cleanupJob,
    finished
  )
}
