'use strict'

module.exports = (data) => {
  var template = ''

  if (data.type && data.type.tiltak && data.type.tiltak === 'Folkehelse') {
    template = 'mottatt-folkehelse'
  }
  if (data.type && data.type.tiltak && data.type.tiltak === 'Kultur') {
    template = 'mottatt-kultur'
  }

  return template
}
