'use strict'

const miss = require('mississippi')
const getSaksnummer = require('tfk-saksbehandling-get-saksnummer')
const getTemplatePath = require('tfk-saksbehandling-organisasjon-tilskudd-templates')
const datePadding = require('./date-padding')
const chooseReplyTemplate = require('./choose-reply-template')
const generateSammendrag = require('./generate-synopsis')
const getCaseType = require('./get-case-type')
const generateEnterpriseAddress = require('./generate-enterprise-address')

function getMidlerType (item) {
  let type = 'Folkehelse'

  if (item.artform && item.artform.artform) {
    type = item.artform.artform
  }

  return type
}

module.exports = miss.through((chunk, encoding, callback) => {
  var item = JSON.parse(chunk)
  const midlerType = getMidlerType(item)
  const caseType = getCaseType(item)
  const caseData = getSaksnummer(caseType)
  const saksbehandler = caseData.saksbehandler
  const enterpriseAddress = generateEnterpriseAddress(item.brregData)

  var documentIn = {
    distribution: false,
    template: getTemplatePath('soknad'),
    type: 'Dokument inn',
    role: 'Avsender'
  }

  var documentOut = {
    distribution: true,
    template: getTemplatePath(chooseReplyTemplate(item)),
    type: 'Dokument ut',
    role: 'Mottaker'
  }
  const now = new Date()
  const then = new Date(parseInt(item.timeStamp, 10))
  const date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  const ourDate = datePadding(then.getDate()) + '.' + datePadding(then.getMonth() + 1) + '.' + then.getFullYear()
  const data = {
    dato: date,
    datoSoknad: ourDate,
    navn: item.brregData.navn,
    adresse: enterpriseAddress.address,
    postnr: enterpriseAddress.zip,
    poststed: enterpriseAddress.city,
    sammendrag: generateSammendrag(item),
    saksnummer: caseData.saksnummer,
    saksbehandlerTittel: saksbehandler.tittel,
    saksbehandlerNavn: saksbehandler.navn,
    saksbehandlerTelefon: saksbehandler.telefon,
    saksbehandlerEpost: saksbehandler.epost
  }

  console.log(`${item._id}: setup-templates - ${item.brregData.navn}`)

  documentIn.data = data
  documentOut.data = data

  documentIn.title = `Søknad tilskuddsmidler - ${midlerType} - ${item.tiltak.navn}`
  documentIn.offTitle = `Søknad tilskuddsmidler - ${midlerType} - ${item.tiltak.navn}`

  documentOut.title = `Bekreftelse på mottatt søknad - ${item.tiltak.navn}`
  documentOut.offTitle = `Bekreftelse på mottatt søknad - ${item.tiltak.navn}`

  if (item.documentTemplates) {
    item.documentTemplates.push(documentIn)
    item.documentTemplates.push(documentOut)
  } else {
    item.documentTemplates = [documentIn, documentOut]
  }

  return callback(null, JSON.stringify(item))
})
