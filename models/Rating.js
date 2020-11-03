const mongoose = require('mongoose');

//schema

const ratingSchema = mongoose.Schema({
    landlord : {
        type: String,
        required: true
    },
    stars : {
        type: Number,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Rating', ratingSchema);
