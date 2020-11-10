const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');

const { getRatings, postRatings, deleteRatings, indvRatings, admin, adminLogin, updateRating, adminAll} = require("../controllers/ratingsController")

//Routes
router.route('/').get(getRatings);

router.route('/').post(postRatings);

router.route('/delete/:id').delete(deleteRatings);

router.get('/add', (req, res) => {
    res.render('add_rating', {
    })
})

router.route('/admin')
    .all(checkAuthenticated)
    .get(admin);

router.post('/admin/login', passport.authenticate('local', {
    successRedirect: '/ratings/admin',
    failureRedirect: '/ratings/admin/login',
    failureFlash: true
}));


router.get('/admin/register', (req, res) => {
    res.render('register', {
    })
})

router.route('/admin/login')
    .all(checkNotAuthenticated)
    .get(adminLogin);


router.delete('/admin/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

router.route('/admin/verify/:id').post(updateRating)

router.route('/admin/all').all(checkAuthenticated).get(adminAll);

router.route('/:id').get(indvRatings);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/ratings/admin/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/ratings/admin')
    }
    next()
}

module.exports = router;