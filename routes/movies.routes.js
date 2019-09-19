const express = require('express');
const upload = require('../configs/cloudinary.config');
const Movie = require('../models/Movie');

const router = express.Router();

router.get('/add', (req, res, next) => {
  res.render('addMovie');
});

router.post('/add', upload.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  const { originalname, url } = req.file;

  const newMovie = new Movie({
    title,
    description,
    imgName: originalname,
    imgPath: url,
  });

  newMovie.save()
    .then(() => res.redirect('/'))
    .catch(error => next(error));
});

module.exports = router;
