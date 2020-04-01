const Book = require('../models/Book');
const User = require('../../../users/models/User');
const async = require('async');
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

    getHistory: (req, res, next) => {
        return res.render('main/history');
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
                return Book.findOne({ title: req.params.title }, (err, book) => {
                    return res.render('main/single-book', { book, success: 'Added to your favorites!' });
                })
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

    checkOutBookAsync: (req, res, next) => {
        if (req.user.checked_books.length > 0) {
            Book.findOne({ title: req.params.title }, (err, book) => {
                if (err) return next(err);
                return res.render('main/single-book', { book, errors: 'Only one book at a time!' });
            })
            return;
        };

        async.waterfall([
            (callback) => {
                Book.findOne({ title: req.params.title }, (err, book) => {
                    if (err) next(err);

                    book.status.available = false;
                    book.status.owner.id = req.user._id;
                    book.status.owner.name = req.user.profile.name;
                    book.status.owner.email = req.user.email;
                    book.status.checkedOut = moment().format('lll');
                    book.status.checkedIn = '';
                    book.status.due_date = moment().add(14, 'days').format('lll');
                    
                    book.save((err) => {
                        if (err) return next(err);
                    })
                    callback(null, book);
                })
            },
            (book, callback) => {
                User.findOne({ email: req.user.email }).then((user) => {
                    if (!user) return res.redirect('/');
    
                    user.checked_books.push({ 
                        book: book._id,
                        bookTitle: req.params.title, 
                        checkOut: book.status.checkedOut,
                        due_date: book.status.due_date
                    });
        
                    user.save((err) => {
                        if (err) return next(err);
                    })
                })
            } 
        ])
        req.flash('success', 'Please return in 14 days or there is a fee of 100 toilet papers.');
        return res.redirect(`/api/books/single-book/${req.params.title}`);
    },

    checkInBookAsync: (req, res, next) => {
        let userDueDate = new Date(req.user.checked_books[0].due_date).toISOString();
        let checkDueDate = moment().isSameOrAfter(userDueDate);

        async.waterfall([
            (callback) => {
                Book.findOne({ title: req.params.title }).then((book) => {
                    book.status.available = true;
                    book.status.owner = '';
                    book.status.checkedIn = moment().format('lll');
                    book.status.due_date = '';
        
                    book.save((err) => {
                        if (err) return next(err);
                    })
                    callback(null, book);
                })
            },
            (book, callback) => {
                User.findOne({ email: req.user.email }).then((user) => {
                    user.checked_books[0].checkIn = book.status.checkedIn;
                    user.checked_books[0].late = checkDueDate;
                    user.history.push(user.checked_books[0]);
                    user.checked_books.pop();
        
                    user.save((err) => {
                        if (err) return next(err);
                    })
                })
            }
        ])
        if (checkDueDate) {
            req.flash('message', 'This book was checked in late.. You will be contacted shortly..')
            return res.redirect(`/api/books/single-book/${req.params.title}`);
        } else {
            req.flash('success', 'Thank you for returning the book. I Hope you enjoyed it!')
            return res.redirect(`/api/books/single-book/${req.params.title}`);
        };
    }
};
