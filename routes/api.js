'use strict';

const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));

const log = require('../lib/logger');

router.post('/message', (req, res) => {
  //log.d('Received announce');
  const data = req.body;

  if(data.message) {
    request.getAsync({
      uri: `${process.env.CHAT_URL}/api/chat/${data.message}`
    }).then((response) => {
      if(response.statusCode == 200) {
        let reply = JSON.parse(response.body);

        res.success(reply);
      }

    }).catch((err) => {
      log.e(err);
    });
	} else {
		log.e(`No message specified`);
		res.error("No message specified");
	}
});

module.exports = router;