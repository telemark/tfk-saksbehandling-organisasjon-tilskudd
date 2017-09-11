'use strict'

const miss = require('mississippi')
const getSaksnummer = require('tfk-saksbehandling-get-saksnummer')
const datePadding = require('./date-padding')
const getCaseType = require('./get-case-type')
const generateEnterpriseAddress = require('./generate-enterprise-address')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)
  const now = new Date()
  let archive = {}

  logger('info', ['setup-archive', item._id, item.brregData.navn])

  const enterpriseAddress = generateEnterpriseAddress(item.brregData)
  const caseType = getCaseType(item)
  const caseData = getSaksnummer(caseType)

  archive._id = item._id
  archive.caseNumber = caseData.saksnummer
  archive.title = `Søknad om tilskuddsmidler ${now.getFullYear()}`
  archive.category = 'tilskudd'
  archive.date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  archive.year = now.getFullYear()
  archive.documentCreated = item.timeStamp

  archive.privatePerson = {
    personalIdNumber: item.dsfContact.personalIdNumber,
    firstName: item.dsfContact.firstName,
    middleName: item.dsfContact.middleName,
    lastName: item.dsfContact.lastName,
    email: item.korData.Email,
    phone: item.korData.MobilePhone,
    fullName: item.dsfContact.fullName,
    address: item.dsfContact.address,
    zip: item.dsfContact.zip,
    city: item.dsfContact.city
  }

  archive.enterprise = {
    enterpriseNumber: item.brregData.orgnr,
    name: item.brregData.navn,
    email: item.organisasjon.epost,
    phoneNumber: item.brregData.tlf,
    officeAddress: {
      streetAddress: item.brregData.forretningsadr,
      zipCode: item.brregData.forradrpostnr,
      zipPlace: item.brregData.forradrpoststed
    },
    postalAddress: {
      streetAddress: enterpriseAddress.address,
      zipCode: enterpriseAddress.zip,
      zipPlace: enterpriseAddress.city
    }
  }

  archive.documents = []

  item.archive = JSON.parse(JSON.stringify(archive))

  return callback(null, JSON.stringify(item))
})
