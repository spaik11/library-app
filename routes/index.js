const express = require('express');
const router = express.Router();
const Book = require('./admin/books/models/Book');

router.get('/', (req, res, next) => {
  Book.find({}).then((book) => {
    book.sort((a, b) => a.rank - b.rank);
    console.log(book)
    res.render('main/home', { book })
  })
  .catch((err) => next(err));
})

module.exports = router;
