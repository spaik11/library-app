const Book = require('../models/Book');
const User = require('../../../users/models/User');

module.exports = {
    getAddBook: (req, res, next) => {
        return res.render('admin/add-books');
    },

    getFavorites: (req, res, next) => {
        return res.render('main/favorites');
    },

    getSingleBook: (req, res, next) => {
        Book.findById({ _id: req.params.id }, (err, book) => {
            if (err) return next(err);
            res.render('main/single-book', { book });
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
            if (user.favorites.includes(req.params.title)) return res.render('main/single-book', { errors: req.flash('errors') });

            user.favorites.push(req.params.title)
            user.save((err) => {
                if (err) return next(err);

                return res.redirect('/');
            })
        })
    },

    delFromFavorites: (req, res, next) => {
        User.findOne({ email: req.user.email }).then((user) => {
            user.favorites = user.favorites.filter((book) => book !== req.params.title);

            user.save((err) => {
                if (err) return next(err);
                return res.redirect('/api/books/favorites')
            })
        })
    },

    checkOut: (req, res, next) => {

    }
}
