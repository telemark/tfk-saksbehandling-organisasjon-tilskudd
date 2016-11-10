'use strict'

const miss = require('mississippi')
const getTemplatePath = require('tfk-saksbehandling-organisasjon-tilskudd-templates')
const datePadding = require('./date-padding')
const chooseReplyTemplate = require('./choose-reply-template')
const generateSammendrag = require('./generate-synopsis')

module.exports = miss.through((chunk, encoding, callback) => {
  var item = JSON.parse(chunk)
  var documentIn = {
    distribution: false,
    template: getTemplatePath('soknad'),
    archiveType: 'Dokument inn'
  }
  var documentOut = {
    distribution: true,
    template: getTemplatePath(chooseReplyTemplate(item)),
    archiveType: 'Dokument ut'
  }
  const now = new Date()
  const then = new Date(parseInt(item.timeStamp, 10))
  const date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  const ourDate = datePadding(then.getDate()) + '.' + datePadding(then.getMonth() + 1) + '.' + then.getFullYear()
  const data = {
    dato: date,
    datoSoknad: ourDate,
    navn: item.dsfData,
    adresse: item.dsfData.ADR || '',
    postnr: item.dsfData.POSTN,
    poststed: item.dsfData.POSTS,
    sammendrag: generateSammendrag(item)
  }

  console.log(item._id + ': setup-templates')

  documentIn.data = data
  documentOut.data = data

  documentIn.archiveTitle = `Bussøknad skoleskyss`
  documentIn.archiveOffTitle = `Bussøknad skoleskyss`

  documentOut.archiveTitle = `Søknad mottatt`
  documentOut.archiveOffTitle = `Søknad mottatt`

  if (item.documentTemplates) {
    item.documentTemplates.push(documentIn)
    item.documentTemplates.push(documentOut)
  } else {
    item.documentTemplates = [documentIn, documentOut]
  }

  return callback(null, JSON.stringify(item))
})
