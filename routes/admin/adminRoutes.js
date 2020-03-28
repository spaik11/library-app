const router = require('express').Router();
const adminValidation = require('./utils/adminValidation');
const { 
    getAdminHome,
    getAddBook, 
    getDeleteBook,
    addBook,
    deleteBook,
    viewCheckedOutBooks,
} = require('./controllers/adminController');

router.get('/', adminValidation, getAdminHome);
router.get('/addbook', adminValidation, getAddBook);
router.get('/viewcheckedbooks', adminValidation, viewCheckedOutBooks);
router.get('/deletebook', adminValidation, getDeleteBook);

router.post('/addbook', addBook);
router.delete('/deletebook/:title', deleteBook);

module.exports = router;