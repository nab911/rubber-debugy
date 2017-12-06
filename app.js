const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const http = require("http");
const session = require("express-session");
const cors = require("cors");
const log = require("./lib/logger");

// Routes
const api = require("./routes/api");

// Load environment variables
require("dotenv").load();

const app = express();
const server = http.createServer(app);
const port = process.env.API_PORT || "3000";

app.use(express.static(`${__dirname}/build`));

app.use((req, res, next) => {
  // Response wrapper functions
  res.success = data => {
    res.send({
      success: true,
      data: data
    });
  };

  res.error = data => {
    res.send({
      success: false,
      data: data
    });
  };

  next();
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.use("/api", api);

// Helper functions
// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      log.e(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      log.e(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  log.i(`Listening on ${bind}`);
}

// Start the Server
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

module.exports = app;
