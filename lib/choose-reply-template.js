'use strict'

module.exports = data => {
  let template = ''

  if (data.formal && data.formal.formal && /folkehelse/.test(data.formal.formal)) {
    template = 'mottatt-folkehelse'
  }
  if (data.formal && data.formal.formal && /kultur/.test(data.formal.formal)) {
    template = 'mottatt-kultur'
  }

  return template
}
