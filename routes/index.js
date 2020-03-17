const express = require('express');
const router = express.Router();
const { 
  getHome,
  getBooks
} = require('./homeController');

router.get('/', getBooks);
router.get('/', getHome);

module.exports = router;
