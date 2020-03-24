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

router.get('/single-book/:title', getSingleBook);
router.get('/favorites', getFavorites);

router.put('/addtofavorites/:title', addToFavorites);
router.put('/checkoutbook/:title', checkOutUserBook, checkOutBook);
router.put('/checkinbook/:title', checkInUserBook, checkInBook);
router.delete('/deletebook/:title', delFromFavorites);

module.exports = router;