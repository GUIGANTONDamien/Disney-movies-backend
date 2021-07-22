const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connexion = require('./routes/Connexion');
const inscription = require('./routes/Inscription');

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use('/', connexion);
app.use('/', inscription);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});
