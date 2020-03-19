const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    rank: { type: Number, default: 99 },
    title: { type: String, default: '' },
    author: { type: String, default: '', lowercase: true, trim: true },
    book_image: { type: String, default: '' },
    description: { type: String, default: '' },
    amazon_product_url: { type: String, default: '' },
    available: { 
        type: Boolean,
        owner: String
    }
});

module.exports = mongoose.model('Book', BookSchema);