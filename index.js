//Module imports
const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');



var app = express();


//Connect to DB
const uri = process.env.DB_CONNECTION;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to db')
});

let db = mongoose.connection;
db.on('error', err => {
  console.log(err)
})


//Import Routes
const ratingRoutes = require("./routes/ratings");

//Middleware
app.use(bodyParser.json());

//Routes
app.use('/ratings', ratingRoutes);
app.use(express.static("public"));


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});



// client.connect(err => {
//   const collection = client.db("test").collection("devices");

//   collection.insertOne(
//     {
//       name: "test"
//     }
//   );

//   // perform actions on the collection object
//   client.close();
// });










// const server = http.createServer((req, res) => {
//   //build filepath
//   let filePath = path.join(
//     __dirname,
//     "public",
//     req.url === "/" ? "index.html" : req.url
//   );

//   //get extension
//   let extname = path.extname(filePath);

//   //intial content type
//   let contentType = "text/html";

//   //check extension then set content
//   switch (extname) {
//     case ".js":
//       contentType = "text/javascript";
//       break;
//     case ".css":
//       contentType = "text/css";
//       break;
//     case ".json":
//       contentType = "application/json";
//       break;
//     case ".png":
//       contentType = "image/png";
//       break;
//     case ".jpg":
//       contentType = "image/jpg";
//       break;
//   }

//   //Read File
//   fs.readFile(filePath, (err, content) => {
//     if (err) {
//       if (err.code == "ENOENT") {
//         //page not found
//         fs.readFile(
//            ,
//           (err, content) => {
//             res.writeHead(200, { "Content-Type": "text/html" });
//             res.end(content, "utf-8");
//           }
//         );
//       } else {
//         res.writeHead(500);
//         res.end(`Server error: ${err.code}`);
//       }
//     } else {
//       //success
//       res.writeHead(200, { "Content-Type": contentType });
//       res.end(content, "utf-8");
//     }
//   });
// });




