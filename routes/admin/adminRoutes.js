const router = require('express').Router();
const adminValidation = require('./utils/adminValidation');
const { 
    getAdminHome,
    getAddBook, 
    addBook,
    viewCheckedOutBooks,
} = require('./controllers/adminController');

router.get('/', adminValidation, getAdminHome);
router.get('/addbook', adminValidation, getAddBook);
router.get('/viewcheckedbooks', adminValidation, viewCheckedOutBooks);

router.post('/addbook', addBook);

module.exports = router;