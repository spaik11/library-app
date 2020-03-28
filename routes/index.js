const express = require('express');
const router = express.Router();
const Book = require('./admin/books/models/Book');
const moment = require('moment');

router.get('/', (req, res, next) => {
    Book.find({}).then((book) => {
      book.sort((a, b) => a.rank - b.rank);

      if (req.isAuthenticated()) {
        if (req.user.checked_books.length > 1) {
          let userDueDate = new Date(req.user.checked_books[0].due_date).toISOString();
          let checkDueDate = moment().isSameOrAfter(userDueDate);

          return res.render('main/home-auth', { book, checkDueDate, errors: req.flash('error') });
        } else {
          checkDueDate = false;
          return res.render('main/home-auth', { book, checkDueDate, errors: req.flash('error') });
        }
        } else {
          return res.render('main/home', { book });
        };
    })
    .catch((err) => next(err));
})

router.get('/pusher', (req, res, next) => {
  return res.render('main/pusher');
})

module.exports = router;
