'use strict'

module.exports = (data) => {
  var template = ''

  if (data.formal && data.formal.formal && /folkehelse/.test(data.formal.formal)) {
    template = 'mottatt-folkehelse'
  }
  if (data.formal && data.formal.formal && /kultur/.test(data.formal.formal)) {
    template = 'mottatt-kultur'
  }

  return template
}
