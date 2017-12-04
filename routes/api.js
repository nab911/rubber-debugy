const express = require("express");
const Promise = require("bluebird");

const request = Promise.promisifyAll(require("request"));

const router = express.Router();

const log = require("../lib/logger");

router.post("/message", (req, res) => {
  const data = req.body;

  if (data.message) {
    request
      .getAsync({
        url: `${process.env.CHAT_URL}/api/chat/${data.message}`,
        headers: req.headers
      })
      .then(response => {
        if (response.statusCode === 200) {
          const reply = JSON.parse(response.body);
          if (response.headers["set-cookie"]) {
            res.header("set-cookie", response.headers["set-cookie"]);
          }
          res.status(200).send(reply);
        }
      })
      .catch(err => {
        log.e(err);
      });
  } else {
    log.e(`No message specified`);
    res.status(422).send("No message specified");
  }
});

module.exports = router;
