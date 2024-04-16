const express = require("express");
const db = require("./db");
const stafRoutes = require("./routes/stafRoutes");
const menuRoutes = require("./routes/menuRoutes");
const bodyParser = require("body-parser");
const Staf = require("./models/staf");
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
app.use(bodyParser.json());
const PORT = process.env.RENDER_PORT || 3000;

passport.use(
  new LocalStrategy(async (userName, password, done) => {
    try {
      console.log("resived credentials ", userName, password);
      const user = await Staf.findOne({ username: userName });
      if (!user) {
        return done(null, false, { message: "Incorect username" });
      }
      const isPasswordMatch = user.password === password ? true : false;

      if (!isPasswordMatch) {
        return done(null, false, { message: "invalid password" });
      } else {
        return done(null, user);
      }
    } catch (error) {
      done(error);
    }
  })
);

app.use(passport.initialize());
app.use("/staf", stafRoutes);
app.use("/menu", menuRoutes);

app.get("/", passport.authenticate("local", { session: false }), (req, res) => {
  res.send("hello wrold");
});

app.get("/bipod", (req, res) => {
  res.send("hello bipod");
});

app.listen(PORT, () => {
  console.log("app is running on port", PORT);
});
