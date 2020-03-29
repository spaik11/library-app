const router = require('express').Router();
const {
    getSingleBook,
    getFavorites,
    addToFavorites,
    delFromFavorites,
    checkOutBookAsync,
    checkInBookAsync,
    checkOutBook,
    checkOutUserBook,
    checkInBook,
    checkInUserBook
} = require('./controllers/bookController');

router.get('/single-book/:title', getSingleBook);
router.get('/favorites', getFavorites);

router.put('/addtofavorites/:title', addToFavorites);
// router.put('/checkoutbook/:title', checkOutUserBook, checkOutBook);
router.put('/checkoutbook/:title', checkOutBookAsync);
router.put('/checkinbook/:title', checkInBookAsync);
router.delete('/deletebook/:title', delFromFavorites);

module.exports = router;