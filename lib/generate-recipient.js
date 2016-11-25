'use strict'

const generateEnterpriseAddress = require('./generate-enterprise-address')

module.exports = (data) => {
  const enterpriseAddress = generateEnterpriseAddress(data)
  var mottaker = {
    type: data.personalIdNumber ? 'privatPerson' : 'organisasjon',
    navn: data.fullName || data.navn,
    adresse1: data.address || enterpriseAddress.address,
    adresse2: '',
    adresse3: '',
    postnr: data.zip || enterpriseAddress.zip,
    poststed: data.city || enterpriseAddress.city
  }

  if (data.personalIdNumber) {
    mottaker.fodselsnr = data.personalIdNumber
  } else {
    mottaker.orgnr = data.orgnr
  }

  return mottaker
}
