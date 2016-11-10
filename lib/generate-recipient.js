'use strict'

module.exports = (data) => {
  var mottaker = {
    type: data.PERS ? 'privatPerson' : 'Organisasjon',
    navn: data.NAVN || data.navn,
    adresse1: data.ADR || data.forretningsadr,
    adresse2: '',
    adresse3: '',
    postnr: data.POSTN || data.forradrpostnr,
    poststed: data.POSTS || data.forradrpoststed
  }

  if (data.PERS) {
    mottaker.fodselsnr = `${data.FODT}${data.PERS}`
  } else {
    mottaker.orgnr = data.orgnr
  }

  return mottaker
}
