const router = require('express').Router();
const Book = require('./models/Book');

router.get('/single-book/:id', (req, res, next) => {
    Book.findById({ _id: req.params.id }, (err, book) => {
        if (err) return next(err);
        res.render('main/single-book', { book });
    })
})

module.exports = router;