'use strict'

const showTiltak = require('./show-tiltak')

module.exports = function (item) {
  const organisasjon = item.organisasjon
  const kontaktperson = item.kontaktperson
  var parts = []
  parts.push('Organisasjon')
  parts.push(`Navn: ${organisasjon.organisasjonsNavn}`)
  parts.push(`Organisasjonsnummer: ${organisasjon.organisasjonsNummer}`)
  parts.push(`Kontonummer: ${organisasjon.kontoNummer}`)
  parts.push(`Telefon: ${organisasjon.telefonNummer}`)
  parts.push(`E-post: ${organisasjon.epost}`)
  parts.push(`Adresse: ${organisasjon.adresse}`)
  parts.push('')
  parts.push('Kontaktperson')
  parts.push(`Navn: ${kontaktperson.navn}`)
  parts.push(`Telefon: ${kontaktperson.telefonNummer}`)
  parts.push(`E-post: ${kontaktperson.epost}`)
  parts.push('')
  parts.push('Tiltak/arrangement')
  showTiltak(item).forEach((line) => {
    parts.push(line)
  })
  parts.push('')
  parts.push('Vilkår')
  parts.push('Jeg godtar vilkårene for tilskudd')
  parts.push('')
  return parts.join('\n')
}
