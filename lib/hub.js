'use strict'

module.exports = function hub (options) {
  const seneca = this

  seneca.add('role: info, info: no-jobs-found', (args, callback) => {
    console.log('No jobs found')
    process.exit(0)
  })

  return options.tag || 'hub'
}
