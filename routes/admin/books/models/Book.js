const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    rank: Number,
    title: String,
    author: String,
    image: String,
    description: String,
    link: String,
    available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Book', BookSchema);