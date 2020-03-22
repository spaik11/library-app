const Book = require('../models/Book');
const User = require('../../../users/models/User');

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
        Book.findById({ _id: req.params.id }, (err, book) => {
            if (err) return next(err);
            return res.render('main/single-book', { book });
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
            if (user.favorites.includes(req.params.id)) return res.render('main/favorites', { errors: req.flash('errors') });

            user.favorites.push( req.params.id );
            
            user.save((err) => {
                if (err) return next(err);
                return res.redirect('/');
            })
        })
        .catch((err) => next(err));
    },

    delFromFavorites: (req, res, next) => {
        User.findOne({ email: req.user.email }).then((user) => {
            user.favorites = user.favorites.filter((book) => book !== req.params.id);

            user.save((err) => {
                if (err) return next(err);
                return res.redirect('/api/books/favorites');
            })
        })
        .catch((err) => next(err));
    },

    checkOutBook: (req, res, next) => {
        Book.findOne({ _id: req.params.id }).then((book) => {
            book.status.available = false;
            book.status.owner = req.user._id;

            book.save((err) => {
                if (err) return next(err);
                next();
            })
        })
        .catch((err) => next(err));
    },

    updateUserBook: (req, res, next) => {
        User.findOne({ email: req.user.email }).then((user) => {
            if (user.currentBook.includes(req.params.id)) return res.render('main/single-book', { errors: req.flash('errors') });
            user.currentBook.push({ book: req.params.id, checkOut: Date.now() })

            user.save((err) => {
                if (err) return next(err);
                return res.redirect(`/api/books/single-book/${req.params.id}`);
            })
        })
    },

    checkInBook: (req, res, next) => {
        Book.findOne({ _id: req.params.id }).then((book) => {
            book.status.available = true;
            book.status.owner = '';

            book.save((err) => {
                if (err) return next(err);
                return res.redirect(`/api/books/single-book/${req.params.id}`);
            })
        })
        .catch((err) => next(err));
    }
}
