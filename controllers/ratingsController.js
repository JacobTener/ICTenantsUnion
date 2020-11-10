const Rating = require('../models/Rating');
const nodemailer = require('nodemailer');




// @desc Get all verified ratings
// @route Get /ratings
// @access Public
exports.getRatings = async (req, res, next) => {
    try {
        const ratings = await Rating.aggregate()
        .match({
            verified: true
        })
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
            email: req.body.email,
            description: req.body.description
    });  

        const savedRating = await rating.save();
        email(rating);
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

        return res.redirect('/ratings/admin')
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
        const ratings = await Rating.find({ landlord: landlord.landlord, verified: true });
        
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

// @desc Get all unverified ratings
// @route Get /ratings/admin
// @access Public
exports.admin = async (req, res, next) => {
    try {
        const ratings = await Rating.find({verified : false})


        return res.render('admin', {
            ratings: ratings
        });
            
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: err 
        });
    }
}

exports.adminLogin = async (req, res, next) => {
    return res.render('login');
}

// @desc Update a rating
// @route Post /ratings/admin/verify/:id
// @access Public
exports.updateRating = async (req, res, next) => {    
    try{
        const rating = await Rating.findById(req.params.id);
        rating.verified = true;
        const savedRating = await rating.save();
        res.redirect('/ratings/admin')
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

function email(rating) {
    var transporter = nodemailer.createTransport(
        {
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "150db1bab12ef1",
                pass: "eb2deb722f4b1c"
            }
        },
        {
           // sender info
            from: 'Nodemailer <example@nodemailer.com>',
            headers: {
                'X-Laziness-level': 1000 // just an example header, no need to use this
            }
        }
    ); 

    let message = {
        // Comma separated list of recipients
        to: 'Nodemailer <example@nodemailer.com>',

        // Subject of the message
        subject: `New review for ${rating.landlord}`,

        // plaintext body
        text: "Landlord: " + rating.landlord + " Rating: " + rating.stars + " Review Description: " + rating.description,

        // HTML body
        html: `<p>Landlord: <b>${rating.landlord}</b><br> Rating: ${rating.stars} <br>Review Description: ${rating.description}</p>`
    
    };
    
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        transporter.close();
    });
}

