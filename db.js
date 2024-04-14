const mongoose = require("mongoose");
require("dotenv").config();

// const mongoUrl = "mongodb://localhost:27017/hoteldb";
const mongoUrl = process.env.MONGO_URL;
console.log(mongoUrl);
mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("your db is connected");
} );


db.on("disconnected", () => {
  console.log("your db is disconnected");
});

db.on("error", (err) => {
  console.log("error in db ", err);
});

module.exports = db;
