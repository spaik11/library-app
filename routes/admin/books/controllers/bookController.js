const Book = require('../models/Book');
const User = require('../../../users/models/User');
const Pusher = require('pusher');
const moment = require('moment');

const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: process.env.CLUSTER,
    encrypted: true
});

module.exports = {
    getAddBook: (req, res, next) => {
        return res.render('admin/add-books');
    },

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

    addBook: (req, res, next) => {
        const { rank, title, author, image, description, link } = req.body;

        const book = new Book();
        book.rank = rank;
        book.title = title;
        book.author = author;
        book.image = image;
        book.description = description;
        book.link = link;

        book.save((err) => {
            if (err) return next(err);
            return res.json({message: 'successfully created book!'});
        })
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
            // need to do a check to clear out the book check-in date
            
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
    },

    viewCheckedOutBooks: (req, res, next) => {
        if (req.isAuthenticated()) {
            Book.find({}).then((books) => {
                const checkedOutBooks = books.filter((book) => !book.status.available);
                return res.render('admin/books-out', { checkedOutBooks });
            });
            return;
        }
        return res.redirect('/');
    }
};
