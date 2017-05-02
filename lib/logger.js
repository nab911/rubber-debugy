var winston = require('winston'),
    fs = require('fs');

require('dotenv').load();
var logLevel = process.env['LOG_LEVEL'] ? process.env['LOG_LEVEL'] : 'warn';

if (!fs.existsSync('./logs')){
    fs.mkdirSync('./logs');
}

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: logLevel
    }),
    new (winston.transports.File)({
      filename: './logs/all.log',
      eol: '\n',
      level: logLevel,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      json: false,
      timestamp: true
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: './logs/exceptions.log',
      eol: '\n',
      maxsize: 5242880, //5MB
      maxFiles: 5,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false
    })
  ]
});

logger.d = function(message) {
  logger.log('debug', message);
};

logger.i = function(message) {
  logger.log('info', message);
};

logger.w = function(message) {
  logger.log('warn', message);
};

logger.e = function(message) {
  logger.log('error', message);
};

module.exports = logger;