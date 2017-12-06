const express = require("express");
const Promise = require("bluebird");

const request = Promise.promisifyAll(require("request"));

const router = express.Router();

const log = require("../lib/logger");

router.post("/message", (req, res) => {
  const data = req.body;

  if (!data.message) {
    log.e(`No message specified`);
    res.status(422).error("No message specified");
    return;
  }

  log.d(`Message received: ${data.message}`);

  request
    .getAsync({
      url: `${process.env.CHAT_URL}/api/chat/${data.message}`,
      headers: req.headers
    })
    .then(response => {
      if (response.statusCode === 200) {
        if (response.headers["set-cookie"]) {
          res.header("set-cookie", response.headers["set-cookie"]);
        }
        res.status(200).send(response.body);
      }
    })
    .catch(err => {
      log.e(err);
    });
});

router.post("/feedback/:feedback", (req, res) => {
  const { feedback } = req.params;

  log.d(`Feedback received: ${feedback} ${req.body.input}:${req.body.response}`);

  request
    .postAsync({
      url: `${process.env.CHAT_URL}/api/feedback/${feedback}`,
      headers: req.headers,
      body: req.body,
      json: true
    })
    .then(response => {
      if (response.statusCode === 200) {
        res.status(200).send(response.body);
      }
    })
    .catch(err => {
      log.e(err);
    });
});

module.exports = router;
