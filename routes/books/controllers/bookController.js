const axios = require('axios');

module.exports = {
    addBooks: async(req, res, next) => {
        try {  
            const response = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NY_TIMES_API}`)
            const bookList = response.data.results.books;
            console.log(bookList)
            return res.render('main/home-auth', { bookList })
        } catch (error) {
            next(error);
        }
    }
}
