const mongoose = require('mongoose');


// Schema for a rating within Mongo DB
const ratingSchema = mongoose.Schema({
    landlord : {
        type: String,
        required: [true, 'Specify a landlord please'],
    },
    stars : {
        type: Number,
        required: [true, 'Add a rating please']
    },
    email : {
        type: String,
        required: [true, 'Add your email'],
    },
    description : {
        type: String,
        required: false
    },
    verified : {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Rating', ratingSchema);
