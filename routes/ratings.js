const express = require('express');
const router = express.Router();
const passport = require('passport');

// Pulling method names from controller to call on route hit
const { getRatings, postRatings, deleteRatings, indvRatings, admin, adminLogin, updateRating, adminAll} = require("../controllers/ratingsController")

// Rating routes

router.route('/').get(getRatings);

router.route('/').post(postRatings);

// Session must be authenticated to delete a rating
router.route('/delete/:id')
    .all(checkAuthenticated)
    .delete(deleteRatings);

router.get('/add', (req, res) => {
    res.render('add_rating', {
    })
})

// Session must be authenticated to reach /ratings/admin
router.route('/admin')
    .all(checkAuthenticated)
    .get(admin);

// Post to /login that will verify user and start a Session if successful
router.post('/admin/login', passport.authenticate('local', {
    successRedirect: '/ratings/admin',
    failureRedirect: '/ratings/admin/login',
    failureFlash: true
}));


router.get('/admin/register', (req, res) => {
    res.render('register', {
    })
})

// Make sure a user can't login twice
router.route('/admin/login')
    .all(checkNotAuthenticated)
    .get(adminLogin);

// Send delete request to end Session
router.delete('/admin/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

router.route('/admin/verify/:id').post(updateRating)

// Check Session before allowing all review view
router.route('/admin/all').all(checkAuthenticated).get(adminAll);

router.route('/:id').get(indvRatings);


// Function that checks req params to make sure user has a logged in Session
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/ratings/admin/login')
}

// Function that checks req params to make sure user has a logged out Session
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/ratings/admin')
    }
    next()
}

module.exports = router;