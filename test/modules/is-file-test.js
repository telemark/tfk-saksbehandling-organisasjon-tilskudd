'use strict'

const tap = require('tap')
const isFile = require('is-file')

tap.ok(isFile, 'is-file loads OK')
