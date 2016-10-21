'use strict'

module.exports = function hub (options) {
  const seneca = this

  seneca.add('role: info, info: no-jobs-found', (args, callback) => {
    console.log('hub: no jobs found')
    process.exit(0)
  })

  seneca.add('role: info, info: new-job-found', (args, callback) => {
    var item = args.item
    console.log(`hub: ${item._id}`)
    process.exit(0)
  })

  seneca.add('role: info, info: cleanup-files', (args, callback) => {
    const deleteFiles = JSON.stringify(args.deletedFiles, null, 2)
    console.log(`hub: cleanup-files: ${deleteFiles}`)
  })

  return options.tag || 'hub'
}
