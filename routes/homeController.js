const Book = require('./books/models/Book');

module.exports = {
    getHome: (req, res, next) => {
            return res.render('main/home');
    }
}