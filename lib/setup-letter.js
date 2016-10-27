'use strict'

const getTemplatePath = require('tfk-saksbehandling-organisasjon-tilskudd-templates')
const chooseReplyTemplate = require('./choose-reply-template')

module.exports = function setupLetter (options) {
  const seneca = this

  seneca.add('role: letter, cmd: setup', (args, callback) => {
    var item = args.item
    var documents = item.documents || []
    const replyTemplate = chooseReplyTemplate(item)
    const svarbrev = {
      data: '',
      template: getTemplatePath(replyTemplate)
    }

    documents.push(svarbrev)

    const soknad = {
      data: '',
      template: getTemplatePath('soknad')
    }

    documents.push(soknad)

    seneca.act('role: info, info: setup-letter-completed', {item: item})
  })

  return options.tag || 'setup-letter'
}
