const winston = require("winston");
const fs = require("fs");

require("dotenv").load();

const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "warn";

if (!fs.existsSync("./logs")) {
  fs.mkdirSync("./logs");
}

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: logLevel
    }),
    new winston.transports.File({
      filename: "./logs/all.log",
      eol: "\n",
      level: logLevel,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      json: false,
      timestamp: true
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: "./logs/exceptions.log",
      eol: "\n",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false
    })
  ]
});

logger.d = message => {
  logger.log("debug", message);
};

logger.i = message => {
  logger.log("info", message);
};

logger.w = message => {
  logger.log("warn", message);
};

logger.e = message => {
  logger.log("error", message);
};

module.exports = logger;
