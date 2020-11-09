const Rating = require('../models/Rating');
const moment = require('moment');

// @desc Get all ratings
// @route Get /ratings
// @access Public
exports.getRatings = async (req, res, next) => {
    try {
        const ratings = await Rating.aggregate()
        .group({
            _id: "$landlord",
            avgstars: {$avg: "$stars"},
            lstdesc: {$last: "$description"},
            lstdate: {$last: "$date"},
            docid: {$first: "$_id"},
            count: {$sum: 1 }
        })
        .sort({
            avgstars: -1,
            count: -1,
            _id: -1
        });

        ratings.forEach((r) => {
            if(r.avgstars.toString().length > 3) r.avgstars = r.avgstars.toPrecision(3);
            r.lstdate = r.lstdate.toDateString();
        })

        return res.render('show_ratings', {
            ratings: ratings
        });
            
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: err 
        });
    }
}



// @desc Post a rating
// @route Post /ratings
// @access Public
exports.postRatings = async (req, res, next) => {
    let landlordInput = req.body.landlord.split(" ");
    
    try{
    const rating = new Rating({
        landlord: landlordInput.map((name) => { 
            return name[0].toUpperCase() + name.substring(1); 
        }).join(" "),
        stars: req.body.stars,
        description: req.body.description
    });  

        const savedRating = await rating.save();
        res.redirect('/ratings');
    }
    catch(err){
        if(err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            })
        }
        else {
            return res.status(500).json({
                success: false,
                data: err 
            });
        }
    }

}


// @desc Delete a rating
// @route delete /ratings/:id
// @access Public
exports.deleteRatings = async (req, res, next) => {
  
    try{
        const rating = await Rating.findById(req.params.id);
        if (!rating) {
            return res.status(404).json({
                success: false,
                error: 'No rating found'
            });
        }

        await rating.remove();

        return res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            data: err 
        });
    }

}

// @desc Get all ratings for a landlord
// @route Get /ratings/:id
// @access Public
exports.indvRatings = async (req, res, next) => {
    try {
        //2 Queries instead of one as to not pass names in URL
        const landlord = await Rating.findById(req.params.id);
        const ratings = await Rating.find({ landlord: landlord.landlord });
        
        return res.render('indv_ratings', {
            ratings: ratings
        });


    } catch (err) {
        return res.status(500).json({
            success: false,
            data: err 
        });
    }
}