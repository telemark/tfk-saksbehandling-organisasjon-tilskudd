'use strict'

module.exports = (data) => {
  var mottaker = {
    type: data.personalIdNumber ? 'privatPerson' : 'Organisasjon',
    navn: data.fullName || data.navn,
    adresse1: data.address || data.forretningsadr,
    adresse2: '',
    adresse3: '',
    postnr: data.zip || data.forradrpostnr,
    poststed: data.city || data.forradrpoststed
  }

  if (data.personalIdNumber) {
    mottaker.fodselsnr = data.personalIdNumber
  } else {
    mottaker.orgnr = data.orgnr
  }

  return mottaker
}
