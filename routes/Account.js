const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

// eslint-disable-next-line func-names
router.get('/', function (request, response) {
  pool.query('SELECT * FROM movie', (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).send(error);
    } else {
      console.log(results);
      response.send(results);
    }
  });
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  pool.query('SELECT * FROM movie WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).send(error);
    } else if (results.length > 0) {
      response.send(results[0]);
    } else {
      console.log(error);
      response.sendStatus(404);
    }
  });
});

router.post('/account', (request, response) => {
  const movie = request.body;
  pool.query(
    `INSERT INTO movie(title, poster_path, overview, vote_average) VALUES (?, ?, ?, ?)`,
    [movie.title, movie.poster_path, movie.overview, movie.vote_average],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send(error);
      } else {
        response.status(201).send({
          id: results.insertId,
          ...movie,
        });
      }
    }
  );
});

module.exports = router;
