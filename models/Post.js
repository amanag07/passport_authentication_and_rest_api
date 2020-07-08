const mongoose = require('mongoose');


// Creating a Schema
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Mongoose Model
module.exports = mongoose.model('Posts', PostSchema);