const Book = require('../books/models/Book');

const adminValidation = (req, res, next) => {
    if (!req.user.admin) {
        Book.find({}).then((book) => {
            return res.render('main/home-auth', { book, errors: 'Access Denied. Please contact your administrator' });
        })
        return;
    } 
    next();
};

module.exports = adminValidation;