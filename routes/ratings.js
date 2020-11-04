const express = require('express');
const router = express.Router();

const { getRatings, postRatings, deleteRatings, indvRatings } = require("../controllers/ratingsController")

//Routes
router.route('/').get(getRatings);

router.route('/').post(postRatings);

router.route('/delete/:id').delete(deleteRatings);

router.get('/add', (req, res) => {
    res.render('add_rating', {
        // landlord: landlord
    })
})

router.route('/:id').get(indvRatings);


// router.route('/')
module.exports = router;