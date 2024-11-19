const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const secret = 'aswu352tgwefwfw';
const multer = require('multer');
const User = require('../models/User');
const upload = multer();


exports.createPost = async (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(500).json({error: 'Failed to verify token'});


        const {title, summary, content} = req.body;
        try {
            const post = await Post.create({title, summary, content, author: info.id});
            await User.findByIdAndUpdate(info.id, {$push: {posts: post._id}});
            res.json(post);
        } catch (error) {
            res.status(500).json({error: 'Failed to create Post'});
        }
    });
};


exports.getPosts = async (req,res) => {
    const posts = await Post.find().populate('author',['username']).sort({createdAt: -1}).limit(10);
    res.json(posts);
}

exports.getLimitPosts = async (req, res) => {
    const {page = 1, limit = 3} = req.query;

    try {
        const blogs = await Post.find()
           .populate('author', ['username'])
           .sort({createdAt: -1})
           .skip((page - 1) * limit)
           .limit(parseInt(limit));

        res.json(blogs);
    }catch (error) {
        res.status(500).json({error: 'Failed to get posts'});

}
}

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
              .populate('author', ['username'])
              .populate({path: 'comments', populate: {path: 'author', select: 'username'}});
        
        res.json(post);
    } catch (error) {
        res.json(500).json({error: 'Failed to get post'});
    }
};


exports.searchPosts = async (req, res) => {
    const {q} = req.query;
    const regex = new RegExp(q, 'i');
    const posts = await Post.find()
                         .populate('author', ['username']);
    const search = posts.filter(post => 
        regex.test(post.title) ||
        regex.test(post.summary) ||
        regex.test(post.author.username)
    );

    res.json(search);
}

exports.updatePost = async (req, res) => {
    const {token} = req.cookies;
    if (!token) return res.status(401).json({error: 'Not Authenticated'});


    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(401).json({error: 'Invalid Token'});


        const {id, title, summary, content} = req.body;
        const post = await Post.findById(id);
        console.log(post);
        if(JSON.stringify(post?.author) !== JSON.stringify(info?.id)) {
            console.log(post?.author, info?.id);
            return res.status(403).json({error: "Unauthorized"});
        }

        post.title = title;
        post.summary = summary;
        post.content = content;

        await post.save();

        res.json(post);
    })
}


