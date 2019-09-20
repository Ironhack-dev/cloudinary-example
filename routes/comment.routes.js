const express = require('express');
const upload = require('../configs/cloudinary.config');
const Comment = require('../models/Comment');
const Movie = require('../models/Movie');

const router = express.Router();


router.post('/newComment/:movieId', (req, res, next) => {
  const { content } = req.body;
  const { movieId } = req.params;
  const newComment = new Comment({
    author: req.user._id,
    content,
  });

  newComment.save()
    .then((comment) => {
      Movie.findByIdAndUpdate(movieId, { $push: { comments: comment._id } })
        .then(() => {
          res.redirect('/');
        })
        .catch((error) => {
          next(error);
        });
    });
});


module.exports = router;
