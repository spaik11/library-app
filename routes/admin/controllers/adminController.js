const Book = require('../books/models/Book');

module.exports = {
    getAdminHome: (req, res, next) => {
        return res.render('admin/admin-home');
    },

    getAddBook: (req, res, next) => {
        return res.render('admin/add-books');
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

    viewCheckedOutBooks: (req, res, next) => {
        Book.find({}).then((books) => {
            const checkedOutBooks = books.filter((book) => !book.status.available);
            return res.render('admin/books-out', { checkedOutBooks });
        });
    }
};