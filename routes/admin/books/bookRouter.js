const router = require('express').Router();
const {
    getSingleBook,
    getFavorites,
    getHistory,
    addToFavorites,
    delFromFavorites,
    checkOutBookAsync,
    checkInBookAsync
} = require('./controllers/bookController');

const {
    userAuthorization
} = require('../../users/utils/userAuth');

router.get('/single-book/:title', userAuthorization, getSingleBook);
router.get('/favorites', userAuthorization, getFavorites);
router.get('/history', userAuthorization, getHistory);

router.put('/addtofavorites/:title', addToFavorites);
router.put('/checkoutbook/:title', checkOutBookAsync);
router.put('/checkinbook/:title', checkInBookAsync);
router.delete('/deletebook/:title', delFromFavorites);

module.exports = router;