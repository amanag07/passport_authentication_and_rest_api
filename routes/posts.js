const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req,res) => { 
    try {
        const posts= await Post.find();
        res.send(posts);
    } catch(err) {
        res.json({ message: err });
    }
})

// Add a post
router.post('/', async (req,res) => {
    // res.json(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.status(400).json({ message: err });
    }
        
})

// Get a single post
router.get('/:postId', async (req,res) => {
    try {
        const singlePost = await Post.findById(req.params.postId);
        res.send(singlePost);
    } catch(err) {
        res.json({ message: err });
    }
})

// Delete a post
router.delete('/:postId', async (req,res) => {
    try {
        const deletedPost = await Post.deleteOne({ _id: req.params.postId });
        res.send(deletedPost);
    } catch(err) {
        res.json({ message: err })
    }
})

// Update a Post
router.patch('/:postId', async (req,res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId }, 
            { $set: { title: req.body.title }}
        )
        res.json(updatedPost);
    } catch(err) {
        res.json({ message: err })
    }
})

module.exports = router;