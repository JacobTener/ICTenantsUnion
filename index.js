//Module imports
const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');



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

//Routes
app.use('/ratings', ratingRoutes);
app.use(express.static("public"));


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

