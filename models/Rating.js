const mongoose = require('mongoose');

//schema

const ratingSchema = mongoose.Schema({
    landlord : {
        type: String,
        required: [true, 'Specify a landlord please'],
    },
    stars : {
        type: Number,
        required: [true, 'Add a rating please']
    },
    description : {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Rating', ratingSchema);
