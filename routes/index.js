const express = require('express');
const router = express.Router();
const Book = require('./admin/books/models/Book');

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    Book.find({}).then((book) => {
      book.sort((a, b) => a.rank - b.rank);
      res.render('main/home-auth', { book })
    })
    .catch((err) => next(err));
  }
      Book.find({}).then((book) => {
        book.sort((a, b) => a.rank - b.rank);
        res.render('main/home', { book })
      })
      .catch((err) => next(err));
})

module.exports = router;
