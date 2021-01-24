// npm for routes
const express = require("express");
const PORT = process.env.PORT || 8080;
const session = require("express-session");
const passport = require("./config/passport");

// npm for .env folder which hides our passwords
require("dotenv").config();

// require sequelize model
var db = require("./models");

// set up app as a instance of express
const app = express();
// able to parse through string and json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// uses public folder for html and css
app.use(express.static("public"));

// express-session middleware
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// sync database then open port upon starting app
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});
