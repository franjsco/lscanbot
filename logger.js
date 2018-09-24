const bunyan = require('bunyan');
const appConfig = require('./config.json');

const log = bunyan.createLogger({
  name: appConfig.app.name,
  streams: [
    {
      level: 'error',
      path: appConfig.logger.errorLogging.filename,
    },
    {
      level: 'info',
      stream: process.stdout,
    },
  ],
});

function logError(msg) {
  log.error(msg);
}

function logInfo(msg) {
  log.info(msg);
}

module.exports.logError = logError;
module.exports.logInfo = logInfo;
