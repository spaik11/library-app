const router = require('express').Router();
const { addBooks } = require('./controllers/bookController');

router.get('/addbooks', addBooks)

module.exports = router;