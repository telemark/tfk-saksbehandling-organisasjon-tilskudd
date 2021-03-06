'use strict'

const miss = require('mississippi')
const getSaksnummer = require('tfk-saksbehandling-get-saksnummer')
const getTemplatePath = require('tfk-saksbehandling-organisasjon-tilskudd-templates')
const escape = require('lodash.escape')
const datePadding = require('./date-padding')
const chooseReplyTemplate = require('./choose-reply-template')
const generateSammendrag = require('./generate-synopsis')
const getCaseType = require('./get-case-type')
const generateEnterpriseAddress = require('./generate-enterprise-address')
const fixLength = require('./fix-length')
const logger = require('./logger')

function getMidlerType (item) {
  let type = 'Folkehelse'

  if (item.artform && item.artform.artform) {
    type = item.artform.artform
  }

  return type
}

module.exports = miss.through((chunk, encoding, callback) => {
  const item = JSON.parse(chunk)
  const midlerType = getMidlerType(item)
  const caseType = getCaseType(item)
  const caseData = getSaksnummer(caseType)
  const saksbehandler = caseData.saksbehandler
  const utvalg = caseData.utvalg
  const enterpriseAddress = generateEnterpriseAddress(item.brregData)

  const documentIn = {
    distribution: false,
    template: getTemplatePath('soknad'),
    type: 'Dokument inn',
    role: 'Avsender'
  }

  const documentOut = {
    distribution: true,
    template: getTemplatePath(chooseReplyTemplate(item)),
    type: 'Dokument ut',
    role: 'Mottaker'
  }
  const now = new Date()
  const then = new Date(parseInt(item.skjemaUtfyllingStop, 10))
  const date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  const ourDate = datePadding(then.getDate()) + '.' + datePadding(then.getMonth() + 1) + '.' + then.getFullYear()
  const data = {
    dato: date,
    datoSoknad: ourDate,
    aar: caseData.aar,
    navn: item.brregData.navn,
    adresse: enterpriseAddress.address,
    postnr: enterpriseAddress.zip,
    poststed: enterpriseAddress.city,
    sammendrag: generateSammendrag(item),
    saksnummer: caseData.saksnummer,
    moetedato: utvalg.dato,
    saksbehandlerTittel: saksbehandler.tittel,
    saksbehandlerNavn: saksbehandler.navn,
    saksbehandlerTelefon: saksbehandler.telefon,
    saksbehandlerEpost: saksbehandler.epost
  }

  logger('info', ['setup-templates', item._id, item.brregData.navn])

  documentIn.data = data
  documentOut.data = data

  documentIn.title = fixLength(`Søknad tilskuddsmidler - ${midlerType} - ${escape(item.tiltak.navn)}`)
  documentIn.offTitle = fixLength(`Søknad tilskuddsmidler - ${midlerType} - ${escape(item.tiltak.navn)}`)

  documentOut.title = fixLength(`Bekreftelse på mottatt søknad - ${escape(item.tiltak.navn)}`)
  documentOut.offTitle = fixLength(`Bekreftelse på mottatt søknad - ${escape(item.tiltak.navn)}`)

  if (item.documentTemplates) {
    item.documentTemplates.push(documentIn)
    item.documentTemplates.push(documentOut)
  } else {
    item.documentTemplates = [documentIn, documentOut]
  }

  return callback(null, JSON.stringify(item))
})
