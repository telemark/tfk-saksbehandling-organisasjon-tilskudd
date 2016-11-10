'use strict'

const miss = require('mississippi')
const datePadding = require('./date-padding')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var now = new Date()
  var archive = {}

  console.log(`${item._id}: setup-archive - ${item.brregData.navn}`)

  archive._id = item._id
  archive.title = `Søknad om tilskudd ${now.getYear()}`
  archive.category = 'tilskudd'
  archive.date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  archive.year = now.getFullYear()
  archive.documentCreated = item.timeStamp

  archive.person = {
    id: item.dsfContact.personalIdNumber,
    firstName: item.dsfContact.firstName,
    middleName: item.dsfContact.middleName,
    lastName: item.dsfContact.lastName,
    email: item.korData.Email,
    phone: item.korData.MobilePhone,
    fullName: item.dsfContact.fullName
  }

  archive.organization = {
    id: item.brregData.orgnr,
    name: item.brregData.name
  }

  archive.documents = []

  item.archive = JSON.parse(JSON.stringify(archive))

  return callback(null, JSON.stringify(item))
})
