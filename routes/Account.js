const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

// eslint-disable-next-line func-names
router.get('/:id', function (request, response) {
  const { id } = request.params;
  pool.query('SELECT * FROM movie WHERE id = ?', [id], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else if (results.length > 0) {
      response.send(results[0]);
    } else {
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

router.put('/:id', (request, response) => {
  const { content } = request.body;
  const { id } = request.params;
  pool.query(
    'UPDATE movie SET content = ? WHERE id = ?',
    [content, id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else if (results.affectedRows > 0) {
        response.status(202).send({ id, content });
      } else {
        response.sendStatus(404);
      }
    }
  );
});

module.exports = router;
