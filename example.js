'use strict'

const saksbehandler = require('./index')

saksbehandler({}, (error, message) => {
  if (error) {
    console.error(error)
  } else {
    console.log(message)
  }
})
