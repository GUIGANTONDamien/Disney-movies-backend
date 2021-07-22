const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/mysql');

const router = express.Router();

router.post('/', (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(403).send('Email or password missing');
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        response.status(500).send(err);
      } else {
        pool.query(
          'INSERT INTO user (email, password) VALUES (?, ?)',
          [email, hash],
          (error, results) => {
            if (error) {
              response.status(500).send(error);
            } else {
              response.status(201).send({
                id: results.insertId,
                ...request.body,
                password: 'hidden',
              });
            }
          }
        );
      }
    });
  }
});
module.exports = router;
