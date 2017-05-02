"use strict";

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const log = require('./lib/logger');

// Load environment variables
require('dotenv').load();

var app = express();
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  // Response wrapper functions
  res.success = function(data){
    this.send({
      success: true,
      data: data
    });
  };

  res.error = function(data){
    this.send({
      success: false,
      data: data
    });
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(cors());

var port = process.env.PORT || '3000';
app.set('port', port);
log.i("Starting web server on port: [" + port + "]");

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      log.e(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.e(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


//Event listener for HTTP server "listening" event
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  log.i('Listening on ' + bind);
}

module.exports = app;
