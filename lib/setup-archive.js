'use strict'

const miss = require('mississippi')
const datePadding = require('./date-padding')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var now = new Date()
  var archive = {}

  console.log(item._id + ': setup-archive')

  archive._id = item._id
  archive.title = `Søknad om tilskudd ${now.getYear()}`
  archive.category = 'tilskudd'
  archive.CALLBACK_STATUS_URL = item.CALLBACK_STATUS_URL
  archive.date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  archive.year = now.getFullYear()
  archive.documentCreated = item.timeStamp

  archive.person = {
    id: `${item.dsfData.FODT}${item.dsfData.PERS}`,
    firstName: item.dsfData['NAVN-F'],
    middleName: item.dsfData['NAVN-M'],
    lastName: item.dsfData['NAVN-S'],
    email: item.korData.Email,
    phone: item.korData.MobilePhone,
    fullName: item.dsfData.NAVN
  }

  archive.organization = {
    id: item.brregData.orgnr,
    name: item.brregData.name
  }

  archive.documents = []

  item.archive = JSON.parse(JSON.stringify(archive))

  return callback(null, JSON.stringify(item))
})
