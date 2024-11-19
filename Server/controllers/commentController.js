const e = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const secret = 'aswu352tgwefwfw';


exports.addComment = async (req, res) => {
    const { token} = req.cookies;
    if (!token) return res.status(401).json({error: 'Not Authenticated'});

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(500).json({error: 'Failed to verify token'});

        const {content} = req.body;
        const {id} = req.params;
        try {
            const comment = await Comment.create({
                content, 
                author: info.id,
                post: id
            });
            await Post.findByIdAndUpdate(id, {$push: {comments: comment._id}});
            res.status(201).json({message: 'Comment added successfully'});
        } catch (error) {
            res.status(500).json({error: 'Failed to add comment'});
        }
    });
}