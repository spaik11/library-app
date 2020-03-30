const Book = require('../books/models/Book');
const moment = require('moment');

module.exports = {
    getAdminHome: (req, res, next) => {
        return res.render('admin/admin-home');
    },

    getAddBook: (req, res, next) => {
        return res.render('admin/add-books');
    },

    getDeleteBook: (req, res, next) => {
        Book.find({}).then((book) => {
            book.sort((a, b) => a.rank - b.rank);
            return res.render('admin/delete-book', { book });
        })
        .catch((err) => next(err));
    },

    addBook: (req, res, next) => {
        const { rank, title, author, book_image, description, amazon_product_url } = req.body;

        if (!title || !author) return res.render('admin/add-books', { errors: 'Please include a title or author' });

        Book.findOne({ title, author }, (err, dbBook) => {
            if (err) return next(err);
            if (dbBook) return res.render('admin/add-books', { errors: 'This book is already in the library.' });

            const book = new Book();
            book.rank = parseInt(rank);
            book.title = title;
            book.author = author;
            book.book_image = book_image;
            book.description = description;
            book.amazon_product_url = amazon_product_url;
            book.status.available = true;

            book.save((err) => {
                if (err) return res.render('admin/add-books', { errors: 'The book did not save..' });
                return res.render('admin/add-books', { message: 'Book was added to the library!' });
            })
        })
        .catch((err) => next(err));
    },

    deleteBook: (req, res, next) => {
        Book.findOneAndDelete({ title: req.params.title }).then((book) => {
            return res.redirect('/api/admin/deletebook');
        })
        .catch((err) => next(err));
    },

    viewCheckedOutBooks: (req, res, next) => {
        Book.find({}).then((books) => {
            const checkedOutBooks = books.filter((book) => !book.status.available);

            return res.render('admin/books-out', { checkedOutBooks });
        })
        .catch((err) => next(err));
    }
};