const express = require("express");
const db = require("./db");
const stafRoutes = require("./routes/stafRoutes");
const menuRoutes = require("./routes/menuRoutes");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.use("/staf", stafRoutes);
app.use("/menu", menuRoutes);

app.get("/", (req, res) => {
  res.send("hello wrold");
});

app.get("/bipod", (req, res) => {
  res.send("hello bipod");
});

app.listen(port, () => {
  console.log("app is running on port", port);
});
