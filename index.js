const http = require("http");
const path = require("path");
const fs = require("fs");
require('dotenv/config');

const server = http.createServer((req, res) => {
  //build filepath
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  //get extension
  let extname = path.extname(filePath);

  //intial content type
  let contentType = "text/html";

  //check extension then set content
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  //Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        //page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          }
        );
      } else {
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      //success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});



//Connect to DB

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_CONNECTION;
const client = new MongoClient(uri, { useNewUrlParser: true});
client.connect(err => {
  const collection = client.db("test").collection("devices");

  collection.insertOne(
    {
      name: "test"
    }
  );

  // perform actions on the collection object
  client.close();
});
