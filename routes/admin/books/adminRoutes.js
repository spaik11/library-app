const router = require('express').Router();
const { 
    getAddBook, 
    addBook
} = require('./controllers/bookController');

router.get('/addbook', getAddBook)
router.post('/addbook', addBook)

module.exports = router;