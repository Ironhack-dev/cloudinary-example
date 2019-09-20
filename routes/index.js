const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

router.use('/', require('./movies.routes'));
router.use('/', require('./comment.routes'));
/* GET home page */
router.get('/', (req, res, next) => {
  Movie.find()
    .populate('creator')
    .then((movies) => {
      res.render('index', { movies });
    })
    .catch(error => next(error));
});

module.exports = router;
