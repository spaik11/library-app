const router = require('express').Router();
const Book = require('./models/Book');
const {
    addToFavorites,
} = require('./controllers/bookController');

router.get('/single-book/:id', (req, res, next) => {
    Book.findById({ _id: req.params.id }, (err, book) => {
        if (err) return next(err);
        res.render('main/single-book', { book });
    })
})

router.put('/addtofavorites/:title', addToFavorites);

module.exports = router;