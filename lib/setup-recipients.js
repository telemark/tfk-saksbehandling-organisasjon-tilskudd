'use strict'

const miss = require('mississippi')
const generateRecipent = require('./generate-recipient')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  var recipients = item.distribution.recipients

  console.log(`${item._id}: setup-recipients - ${item.brregData.navn}`)

  recipients.push(generateRecipent(item.dsfContact))

  recipients.push(generateRecipent(item.brregData))

  return callback(null, JSON.stringify(item))
})
