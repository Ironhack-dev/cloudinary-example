const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

router.use('/', require('./movies.routes'));
/* GET home page */
router.get('/', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render('index', { movies });
    })
    .catch(error => next(error));
});

module.exports = router;
