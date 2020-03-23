const router = require('express').Router();
const {
    getSingleBook,
    getFavorites,
    addToFavorites,
    delFromFavorites,
    checkOutBook,
    checkOutUserBook,
    checkInBook,
    checkInUserBook
} = require('./controllers/bookController');

router.get('/single-book/:id', getSingleBook);
router.get('/favorites', getFavorites);

router.put('/addtofavorites/:id', addToFavorites);
router.put('/checkoutbook/:id', checkOutBook, checkOutUserBook);
router.put('/checkinbook/:id', checkInBook, checkInUserBook);
router.delete('/deletebook/:id', delFromFavorites);

module.exports = router;