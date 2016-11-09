'use strict'

const miss = require('mississippi')
const getSkoleAar = require('get-skole-aar')
const datePadding = require('./date-padding')
const doAutomaticSignOff = require('./do-automatic-signoff')
const skoleAar = getSkoleAar()

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var now = new Date()
  var archive = {}

  console.log(item._id + ': setup-archive')

  archive._id = item._id
  archive.title = `Skoleskyss ${skoleAar}`
  archive.signOff = doAutomaticSignOff(item)
  archive.category = 'skoleskyss'
  archive.CALLBACK_STATUS_URL = item.CALLBACK_STATUS_URL
  archive.date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  archive.year = now.getFullYear()
  archive.documentCreated = item.timeStamp

  archive.person = {
    id: item.korData.uid,
    firstName: item.dsfData['NAVN-F'],
    middleName: item.dsfData['NAVN-M'],
    lastName: item.dsfData['NAVN-S'],
    email: item.korData.Email,
    phone: item.korData.MobilePhone,
    fullName: item.dsfData.NAVN
  }

  archive.documents = []

  item.archive = JSON.parse(JSON.stringify(archive))

  return callback(null, JSON.stringify(item))
})
