const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    rank: { type: Number, default: 99 },
    title: { type: String, default: '', lowercase: true, trim: true },
    author: { type: String, default: '', lowercase: true, trim: true },
    book_image: { type: String, default: '' },
    description: { type: String, default: '' },
    amazon_product_url: { type: String, default: '' },
    available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Book', BookSchema);