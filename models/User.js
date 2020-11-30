const mongoose = require('mongoose');


// Schema for a user within Mongo DB
const userSchema = mongoose.Schema({
    id : {
        type: Number,
        required: [true]
    },
    username : {
        type: String,
        required: [true]
    },
    password : {
        type: String,
        required: [true]
    }
});

module.exports = mongoose.model('User', userSchema);
