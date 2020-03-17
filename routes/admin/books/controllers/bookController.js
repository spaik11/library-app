const axios = require('axios');
const Book = require('../models/Book');

module.exports = {
    getAddBooks: (req, res, next) => {
        return res.render('admin/add-books');
    },

    addBooks: (req, res, next) => {

    }
}
