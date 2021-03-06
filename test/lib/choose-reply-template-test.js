'use strict'

const tap = require('tap')
const replyTemplate = require('../../lib/choose-reply-template')
const data = {}
const dataFolkehelse = {
  formal: {
    formal: 'Bidra til folkehelseaktiviteter'
  }
}
const dataKultur = {
  formal: {
    formal: 'Bidra til kulturaktiviteter'
  }
}

tap.ok(replyTemplate, 'choose-reply-template loads OK')

tap.equal(replyTemplate(data), '', 'returns empty for empty')

tap.equal(replyTemplate(dataFolkehelse), 'mottatt-folkehelse', 'returns mottatt-folkehelse for folkehelse')

tap.equal(replyTemplate(dataKultur), 'mottatt-kultur', 'returns mottatt-kultur for kultur')
