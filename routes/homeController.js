const Book = require('./books/models/Book');
const axios = require('axios');

module.exports = {
    getHome: (req, res, next) => {
        Book.find({})
            .then((books) => {
                if (req.isAuthenticated()) {
                    return res.render('main/home-auth', { books });
                } else {
                    return res.render('main/home', { books });
                }
            })
    },
    
    getBooks: async(req, res, next) => {
        try {  
            const response = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NY_TIMES_API}`)
            const bookList = response.data.results.books;
        
            bookList.forEach((apiBook) => {
                const book = new Book();
                book.rank = apiBook.rank;
                book.title = apiBook.title;
                book.author = apiBook.author;
                book.image = apiBook.book_image;
                book.description = apiBook.description;
                book.link = apiBook.amazon_product_url;

                book.save((err) => {
                    if (err) {
                        return res.status(500).res.json({ message: 'The book did not save' });
                    } else {
                        next();
                    }
                })
            })
        } catch (error) {
            next(error);
        }
    }
}