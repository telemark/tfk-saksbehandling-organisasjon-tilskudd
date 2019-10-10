'use strict'

const miss = require('mississippi')
const generateRecipent = require('./generate-recipient')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)

  const recipients = item.distribution.recipients

  logger('info', ['setup-recipients', item._id, item.brregData.navn])

  recipients.push(generateRecipent(item.dsfContact))

  recipients.push(generateRecipent(item.brregData))

  return callback(null, JSON.stringify(item))
})
