const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async(req, res, next) => {
  try {  
    const response = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NY_TIMES_API}`)
    const bookList = response.data.results.books;
    

    if (req.isAuthenticated()) {
      return res.render('main/home-auth', { bookList });
    } else {
        return res.render('main/home', { bookList });
    }
  } catch (error) {
    next(err);
  }
});

module.exports = router;
