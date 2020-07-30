const mongoose = require('mongoose');


// Creating a Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Mongoose Model
module.exports = mongoose.model('User', UserSchema);