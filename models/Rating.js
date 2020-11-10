const mongoose = require('mongoose');

//schema

const ratingSchema = mongoose.Schema({
    landlord : {
        type: String,
        required: [true, 'Specify a landlord please'],
        //match: ['^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*(\s)*$']
    },
    stars : {
        type: Number,
        required: [true, 'Add a rating please']
    },
    email : {
        type: String,
        required: [true, 'Add your email'],
        //match: ['/^\S+@\S+\.\S+$/', 'There is an error in the entered email address']
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
