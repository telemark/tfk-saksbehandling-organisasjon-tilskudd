'use strict'

const miss = require('mississippi')
const getTemplatePath = require('tfk-saksbehandling-organisasjon-tilskudd-templates')
const datePadding = require('./date-padding')
const chooseReplyTemplate = require('./choose-reply-template')
const generateSammendrag = require('./generate-synopsis')

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
  var documentIn = {
    distribution: false,
    template: getTemplatePath('soknad'),
    type: 'Dokument inn'
  }
  var documentOut = {
    distribution: true,
    template: getTemplatePath(chooseReplyTemplate(item)),
    type: 'Dokument ut'
  }
  const now = new Date()
  const then = new Date(parseInt(item.timeStamp, 10))
  const date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  const ourDate = datePadding(then.getDate()) + '.' + datePadding(then.getMonth() + 1) + '.' + then.getFullYear()
  const data = {
    dato: date,
    datoSoknad: ourDate,
    navn: item.brregData.navn,
    adresse: item.brregData.forretningsadr || '',
    postnr: item.brregData.forradrpostnr,
    poststed: item.brregData.forradrpoststed,
    sammendrag: generateSammendrag(item)
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
