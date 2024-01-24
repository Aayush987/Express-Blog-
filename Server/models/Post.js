const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {timestamps: true});

module.exports = mongoose.model('Post',PostSchema);