const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    rank: { type: Number, default: 99 },
    title: { type: String, default: '' },
    author: { type: String, default: '' },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    link: { type: String, default: '' },
    available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Book', BookSchema);