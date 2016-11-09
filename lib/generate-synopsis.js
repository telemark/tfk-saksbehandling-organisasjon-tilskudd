'use strict'

function showDsfBosted (dsfData) {
  var address = ''

  if (dsfData.GARD) {
    address = 'Gårds og bruksnummer: ' + dsfData.KOMNR + '-' + parseInt(dsfData.GARD, 10) + '/' + parseInt(dsfData.BRUK, 10)
  } else {
    address = dsfData.ADR + ', ' + dsfData.POSTN + ' ' + dsfData.POSTS
  }

  return address
}

function showBosted (data) {
  var outputs = []

  if (data.bosted.bosted === 'folkeregistrert') {
    outputs.push('Hjemme, på folkeregistrert bosted')
    outputs.push(showDsfBosted(data.dsfData))
    if (data['distance-see-dsf']) {
      outputs.push('Beregnet avstand til skole: ' + data['distance-see-dsf'].data.distance)
      outputs.push('Beregnet rute: ' + data['distance-see-dsf'].data.staticMapUrl)
    }
  }

  if (data.bosted.bosted === 'delt') {
    outputs.push('Delt bosted')
    outputs.push('Folkeregistrert bosted')
    outputs.push(showDsfBosted(data.dsfData))
    if (data['distance-see-dsf']) {
      outputs.push('Beregnet avstand til skole: ' + data['distance-see-dsf'].data.distance)
      outputs.push('Beregnet rute: ' + data['distance-see-dsf'].data.staticMapUrl)
    }
    outputs.push('')
    outputs.push('Bosted nummer to')
    outputs.push(showDsfBosted(data.bosteddelt))
    if (data['distance-see-delt']) {
      outputs.push('Beregnet avstand til skole: ' + data['distance-see-delt'].data.distance)
      outputs.push('Beregnet rute: ' + data['distance-see-delt'].data.staticMapUrl)
    }
  }

  if (data.bosted.bosted === 'hybel') {
    outputs.push('Hybel')
    outputs.push(showDsfBosted(data.bostedhybel))
    if (data['distance-see-hybel']) {
      outputs.push('Beregnet avstand til skole: ' + data['distance-see-hybel'].data.distance)
      outputs.push('Beregnet rute: ' + data['distance-see-hybel'].data.staticMapUrl)
    }
  }

  return outputs
}

module.exports = function (item) {
  var parts = []
  parts.push('Personalia')
  parts.push('Navn: ' + item.dsfData.NAVN)
  parts.push('Fødselsnummer: ' + item.korData.uid)
  parts.push()
  parts.push('Folkeregistrert adresse')
  parts.push(showDsfBosted(item.dsfData))
  parts.push('')
  parts.push('Kontaktinformasjon')
  if (item.korData.MobilePhone) {
    parts.push('Mobilnummer: ' + item.korData.MobilePhone)
  }
  if (item.korData.Email) {
    parts.push('Epostadresse: ' + item.korData.Email)
  }
  parts.push('')
  parts.push('Skole')
  if (item.skoleData && item.skoleData.name) {
    parts.push(item.velgklasse.klassetrinn + ' ' + item.skoleData.name)
    if (item.velgstudieretning && item.velgstudieretning.grunnlag !== 'Annen linje') {
      parts.push(item.velgstudieretning.grunnlag)
    }
  }
  if (item.skoleadresse && item.skoleadresse.skoleNavn) {
    parts.push(item.velgklasse.klassetrinn + ' ' + item.skoleadresse.skoleNavn + ', ' + item.skoleadresse.fylkeNavn)
  }
  parts.push('')
  parts.push('Bosted i skoleperioden')
  showBosted(item).forEach(function (line) {
    parts.push(line)
  })
  parts.push('')
  parts.push('Grunnlag for søknad: ' + item.grunnlag.grunnlag)
  parts.push('')
  parts.push('Busskort')
  if (item.busskort.mottattBusskort === 'ja') {
    parts.push('Jeg har mottatt busskort tidligere')
  }
  if (item.busskort.mottattBusskort === 'nei') {
    parts.push('Jeg har ikke mottatt busskort tidligere')
  }
  if (item.busskort.mottattBusskort === 'mistet') {
    parts.push('Jeg har mistet busskortet mitt')
  }
  if (item.busskortnummer) {
    parts.push('Busskortnummer: ' + item.busskortnummer.busskortNummer)
  }
  parts.push('')
  if (item.tidligereSoknad) {
    parts.push('Merknader')
    parts.push('Har søkt tidligere')
    if (item.duplikatSoknad) {
      parts.push('Ingen nye opplysninger')
    } else {
      parts.push('Opplysninger er endret')
    }
    parts.push('')
  }
  parts.push('Vilkår')
  parts.push('Jeg godtar vilkårene for skoleskyss')
  parts.push('')
  return parts.join('\n')
}
