const express = require('express');
const router = express.Router();
const Book = require('./admin/books/models/Book');

router.get('/', (req, res, next) => {
    Book.find({}).then((book) => {
      book.sort((a, b) => a.rank - b.rank);
      if (req.isAuthenticated()) {
        return res.render('main/home-auth', { book, errors: req.flash('error') });
      } else {
        return res.render('main/home', { book });
      }
    })
    .catch((err) => next(err));
})

router.get('/pusher', (req, res, next) => {
  return res.render('main/pusher');
})

module.exports = router;
