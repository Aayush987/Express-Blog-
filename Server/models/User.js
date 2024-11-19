const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    about_me: {
        type: String,
        required: true,
    },
    socials: {
        twitter: {
            type: String,
            match: /^https?:\/\/(www\.)?x\.com\/[A-Za-z0-9_]{1,15}$/,  // Regex for Twitter URL
            required: false
        },
        linkedIn: {
            type: String,
            match: /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
            required: false
        },
        github: {
            type: String,
            match: /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+$/,  // Regex for GitHub URL
            required: false
        },
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
})

module.exports = mongoose.model('User', UserSchema);