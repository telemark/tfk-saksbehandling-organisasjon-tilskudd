'use strict'

module.exports = function getNextJob (options) {
  const fs = require('fs')
  const seneca = this

  seneca.add('role: jobs, cmd: next', (args, callback) => {
    const isJson = (item) => item.endsWith('.json')
    const jobs = fs.readdirSync(options.JOB_DIRECTORY_PATH).filter(isJson)

    console.log('get-next-job')

    if (jobs.length > 0) {
      const item = JSON.parse(fs.readFileSync(options.JOB_DIRECTORY_PATH + '/' + jobs[0]).toString())
      console.log('get-next-job: found job')
      seneca.act('role:info, info:new-job-found', {item: item})
    } else {
      seneca.act('role: info, info:no-jobs-found')
    }
  })

  return options.tag || 'get-next-job'
}
