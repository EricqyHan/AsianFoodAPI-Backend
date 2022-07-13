const { response } = require("express");
const express = require("express");
const { request } = require("http");
const app = express();
const cors = require("cors");
const { connect } = require("http2");
const PORT = 8008;
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let db,
  dbConnectionString = process.env.DB_String,
  dbName = "asian-food-api",
  collection;

// tell express to use cors
// cors helps with cross domain request to not be blocked
app.use(cors());
// middleware to help with communication
app.use(express.json());

// this is a promise
MongoClient.connect(dbConnectionString)
  .then((client) => {
    console.log(`Connected to DB`);
    db = client.db(dbName);
    collection = db.collection("dim-sum");

    // handle read request for homepage
    app.get("/", (req, res) => {
      res.sendFile(___dirname + "/index.html");
    });

    // when we want API data back
    app.get("/api/:name", (req, res) => {
      const names = req.params.name.toLowerCase();
      // make sure to look inside a database instead of inside food object that was originally here
      // go into db colelction and find object where name = names and convert to array
      infoCollection
        .find({ name: names })
        .toArray()
        .then((results) => {
          console.log(results);
          // take the response and turn it to JSON
          // res.json is turning it to JSON what is return it to us (also if you don't turn it to an array it will not come back)
          // like telling a UPS guy to turn it to JSON and give it to us
          res.json(results[0]);
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
