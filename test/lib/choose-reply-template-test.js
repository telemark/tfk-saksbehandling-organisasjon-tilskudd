'use strict'

const tap = require('tap')
const replyTemplate = require('../../lib/choose-reply-template')
const data = {}
const dataFolkehelse = {
  type: {
    tiltak: 'Folkehelse'
  }
}
const dataKultur = {
  type: {
    tiltak: 'Kultur'
  }
}

tap.ok(replyTemplate, 'choose-reply-template loads OK')

tap.equal(replyTemplate(data), '', 'returns empty for empty')

tap.equal(replyTemplate(dataFolkehelse), 'mottatt-folkehelse', 'returns mottatt-folkehelse for folkehelse')

tap.equal(replyTemplate(dataKultur), 'mottatt-kultur', 'returns mottatt-kultur for kultur')
