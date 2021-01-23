const db = require("../models");
const { villagers } = require("animal-crossing");

module.exports = (app) => {
  // authenticate user when they click log in button
  app.post("/api/login", function (req, res) {
    res.send({ msg: "success" });
  });

  // add user to database when they click to sign up
  //   then redirect them to login temporarily so they can log in
  app.post("/api/signup", function (req, res) {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  app.get("/api/logout", function (req, res) {
    res.redirect("/");
  });

  app.get("/api/user_data", function (req, res) {
    res.json({
      username: req.body.username,
      email: req.body.email,
      id: req.body.id,
    });
  });

  // get a villager by name
  app.get("/api/:character", function (req, res) {
    const character = villagers.find(
      (villager) => villager.name === req.params.character
    );
    const villager = {
      name: character.name,
      photo: character.photoImage,
      species: character.species,
      personality: character.personality,
      hobby: character.hobby,
      birthday: character.birthday,
      catchphrase: character.catchphrase,
      favoriteSong: character.favoriteSong,
    };
    res.send(villager);
  });
};
