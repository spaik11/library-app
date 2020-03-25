const Book = require('../models/Book');
const User = require('../../../users/models/User');
const moment = require('moment');

module.exports = {
    getFavorites: (req, res, next) => {
        Book.find({}).then((book) => {
            return res.render('main/favorites', { book });
        });
    },

    getSingleBook: (req, res, next) => {
        Book.findOne({ title: req.params.title }, (err, book) => {
            if (err) return next(err);
            return res.render('main/single-book', { book, errors: req.flash('error') });
        });
    },

    addToFavorites: (req, res, next) => {
        User.findOne({ email: req.user.email }).then((user) => {
            if (user.favorites.includes(req.params.title)) {
                Book.findOne({ title: req.params.title }, (err, book) => {
                    if (err) return next();
                    return res.render('main/single-book', { book, errors: 'This book is already in your favorites.' });
                });
                return;
            }

            user.favorites.push( req.params.title );
            
            user.save((err) => {
                if (err) return next(err);
                return res.redirect('/');
            })
        })
        .catch((err) => next(err));
    },

    delFromFavorites: (req, res, next) => {
        User.findOne({ email: req.user.email }).then((user) => {
            user.favorites = user.favorites.filter((book) => book !== req.params.title);

            user.save((err) => {
                if (err) return next(err);
                return res.redirect('/api/books/favorites');
            })
        })
        .catch((err) => next(err));
    },

    checkOutBook: (req, res, next) => {
        Book.findOne({ title: req.params.title }).then((book) => {
            book.status.available = false;
            book.status.owner.id = req.user._id;
            book.status.owner.name = req.user.profile.name;
            book.status.owner.email = req.user.email;
            book.status.checkedOut = moment().format('MMMM Do YYYY, h:mm:ss a');
            book.status.checkedIn = '';
            
            book.save((err) => {
                if (err) return next(err);
                return res.redirect(`/api/books/single-book/${req.params.title}`);
            })
            
        })
        .catch((err) => next(err));
    },

    checkOutUserBook: (req, res, next) => {
        User.findOne({ email: req.user.email }).then((user) => {
            if (user.checked_books.length > 0) {
                Book.findOne({ title: req.params.title }, (err, book) => {
                    if (err) return next();
                    return res.render('main/single-book', { book, errors: 'You can only check out one book at a time!' });
                });
                return;
            }

            user.checked_books.push({ bookTitle: req.params.title, checkOut: moment().format('MMMM Do YYYY, h:mm:ss a') });

            user.save((err) => {
                if (err) return next(err);
                next();
            })
        })
        .catch((err) => next(err));
    },

    checkInBook: (req, res, next) => {
        Book.findOne({ title: req.params.title }).then((book) => {
            book.status.available = true;
            book.status.owner = '';
            book.status.checkedIn = moment().format('MMMM Do YYYY, h:mm:ss a');

            book.save((err) => {
                if (err) return next(err);
                return res.redirect(`/api/books/single-book/${req.params.title}`);
            })
        })
        .catch((err) => next(err));
    },

    checkInUserBook: (req, res, next) => {
        User.findOne({ email: req.user.email }).then((user) => {
            user.checked_books.pop();

            user.save((err) => {
                if (err) return next(err);
                next();
            })
        })
        .catch((err) => next(err));
    }
};
