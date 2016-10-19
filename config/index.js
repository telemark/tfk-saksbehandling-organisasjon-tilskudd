'use strict'

module.exports = {
  JWT_KEY: process.env.TFK_SOT_JWT_KEY || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  CALLBACK_STATUS_MESSAGE: process.env.TFK_SOT_CALLBACK_STATUS_MESSAGE || 'Søknad behandlet',
  JOB_DIRECTORY_PATH: process.env.TFK_SOT_JOB_DIRECTORY_PATH || 'test/data/jobs',
  DISTRIBUTION_DIRECTORY_PATH: process.env.TFK_SOT_DISTRIBUTION_DIRECTORY_PATH || 'test/data/distribution',
  ARCHIVE_DIRECTORY_PATH: process.env.TFK_SOT_ARCHIVE_DIRECTORY_PATH || 'test/data/archive',
  DONE_DIRECTORY_PATH: process.env.TFK_SOT_DONE_DIRECTORY_PATH || 'test/data/done',
  ERROR_DIRECTORY_PATH: process.env.TFK_SOT_ERROR_DIRECTORY_PATH || 'test/data/errors',
}