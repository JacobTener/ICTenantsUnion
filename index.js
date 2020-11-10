//Module imports
require('dotenv/config');
const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override')

users = [
  {
    "id": 1,
    "username": "admin",
    "password": "$2a$04$luBbjJj6saTEEkQqyPpptuBXmM3Ymv.h26pHjb3VuUr6zlRINZGdC"
  }
]

initializePassport(
  passport,
  username => users.find(user => user.username === username),
  id => users.find(user => user.id === id)
);

//Connect to DB
const uri = process.env.DB_CONNECTION;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to db')
});

let db = mongoose.connection;
db.on('error', err => {
  console.log(err)
})

//Initialize app
var app = express();

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Import Routes
const ratingRoutes = require("./routes/ratings");

//Middleware
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
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

