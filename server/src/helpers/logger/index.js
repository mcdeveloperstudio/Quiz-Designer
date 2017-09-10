const winston = require('winston');
const { loggerConfig } = require('../../config');

const logger = new (winston.Logger)({
  exitOnError: false,
  transports: [
    new (winston.transports.Console)(loggerConfig.transports.console),
    new (winston.transports.File)(loggerConfig.transports.file),
  ],
});

module.exports = logger;