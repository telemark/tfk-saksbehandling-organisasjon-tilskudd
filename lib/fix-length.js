'use strict'

module.exports = input => {
  return input.length > 128 ? `${input.substr(0, 125)}...` : input
}
