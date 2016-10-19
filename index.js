'use strict'

const seneca = require('seneca')()
const getNextJob = require('./lib/get-next-job')
const hub = require('./lib/hub')
const config = require('./config')

seneca.use(hub)
seneca.use(getNextJob, {JOB_DIRECTORY_PATH: config.JOB_DIRECTORY_PATH})

seneca.on('ready', () => {
  seneca.act('role: jobs, cmd: next')
})
