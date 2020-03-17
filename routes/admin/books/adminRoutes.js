const router = require('express').Router();
const { 
    getAddBooks, 
    addBooks 
} = require('./controllers/bookController');

router.get('/addbooks', getAddBooks)
router.post('/addbooks', addBooks)

module.exports = router;