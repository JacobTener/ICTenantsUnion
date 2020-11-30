//Module imports
require('dotenv/config');
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const initializePassport = require('./passport-config');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override')
const User = require('./models/User');


//Connect to DB
const uri = process.env.DB_CONNECTION;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to db')
});

let db = mongoose.connection;
db.on('error', err => {
  console.log(err)
})

//Start passport with functions to find user from DB
initializePassport(
  passport,
  username =>  User.findOne({username: username}),
  id =>  User.findOne({id: id})
);


//Initialize app
var app = express();

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Import Routes
const ratingRoutes = require("./routes/ratings");

//Middleware

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

//Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

//Flash middleware
app.use(flash());
app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  res.locals.successes = req.flash("success");
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Override middleware for delete req
app.use(methodOverride('_method'));

//Routes
app.use('/ratings', ratingRoutes);
app.use(express.static("public",
{
  extensions: ['html']
}));


//Fallback 404
app.use(function(req,res){
  res.status(404).render('404');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

