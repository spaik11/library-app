const router = require('express').Router();
const {
    getSingleBook,
    getFavorites,
    addToFavorites,
    delFromFavorites,
    checkOutBook,
    checkInBook
} = require('./controllers/bookController');

router.get('/single-book/:id', getSingleBook);
router.get('/favorites', getFavorites);

router.put('/addtofavorites/:id', addToFavorites);
router.put('/checkoutbook/:id', checkOutBook);
router.put('/checkinbook/:id', checkInBook);
router.delete('/deletebook/:id', delFromFavorites);

module.exports = router;