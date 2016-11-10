'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  const fileName = config.ARCHIVE_DIRECTORY_PATH + '/' + item._id + '.json'

  if (item.errors.length === 0) {
    console.log(`${item._id}: save-job-archive on success - ${item.brregData.navn}`)
    if (item.dsfData) {
      item.archive.dsfData = JSON.parse(JSON.stringify(item.dsfData))
    }
    if (item.dsfError) {
      item.archive.dsfError = JSON.parse(JSON.stringify(item.dsfError))
    }
    if (item.dsfContact) {
      item.archive.dsfContact = JSON.parse(JSON.stringify(item.dsfContact))
    }
    if (item.p360Data) {
      item.archive.p360Data = JSON.parse(JSON.stringify(item.p360Data))
    }
    if (item.brregData) {
      item.archive.brregData = JSON.parse(JSON.stringify(item.brregData))
    }
    if (item.korData) {
      item.archive.korData = JSON.parse(JSON.stringify(item.korData))
    }
    fs.writeFileSync(fileName, JSON.stringify(item.archive, null, 2))
  } else {
    console.log(`${item._id}: save-job-archive - nothing to archive due to errors - ${item.brregData.navn}`)
  }

  return callback(null, JSON.stringify(item))
})
