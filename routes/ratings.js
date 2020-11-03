const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');


//Routes
router.get('/', async (req, res) => {
    try {
        const ratings = await Rating.find();
        res.json(ratings);
    
    } catch (err) {
        res.json({message: err });
    }

});

router.post('/', async (req, res) => {
    const rating = new Rating({
        landlord: req.body.landlord,
        stars: req.body.stars,
        description: req.body.description
    });
    console.log(rating)
    try{
        const savedRating = await rating.save()
        res.json(savedRating);
    }
    catch(err){
        res.json({message:err});
    }

});

module.exports = router;