'use strict'

const tap = require('tap')
const fixLength = require('../../lib/fix-length')
const dontFixMe = 'This string is not too long'
const fixMe = 'This string is too long This string is too long This string is too long This string is too long This string is too long This string is too long'
const fixedMe = 'This string is too long This string is too long This string is too long This string is too long This string is too long This ...'

tap.equal(dontFixMe, fixLength(dontFixMe), 'it returns unstripped string')

tap.equal(fixedMe, fixLength(fixMe), 'it returns stripped string')
