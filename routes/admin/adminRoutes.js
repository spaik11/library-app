const router = require('express').Router();
const { 
    getAddBook, 
    addBook,
    viewCheckedOutBooks
} = require('./books/controllers/bookController');

router.get('/addbook', getAddBook);
router.get('/viewcheckedbooks', viewCheckedOutBooks);
router.post('/addbook', addBook);

module.exports = router;