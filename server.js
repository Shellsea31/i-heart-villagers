// npm for routes
const express = require("express");
const PORT = process.env.PORT || 8080;

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

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// sync database then open port upon starting app
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});
