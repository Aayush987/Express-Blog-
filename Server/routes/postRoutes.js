const express = require('express');
const { createPost, getPosts, getPostById, updatePost, getLimitPosts, searchPosts } = require('../controllers/postController');
const router = express.Router();

router.post('/post', createPost);
router.get('/post', getLimitPosts);
router.get('/allposts',getPosts);
router.get('/post/:id', getPostById);
router.get('/searchPost',searchPosts);
router.put('/post', updatePost);


module.exports = router;