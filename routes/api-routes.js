const db = require("../models");
const { villagers } = require("animal-crossing");
const passport = require("../config/passport");

module.exports = (app) => {
  // authenticate user when they click log in button
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
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
    // end session for req.user
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        username: req.user.username,
        id: req.user.id,
      });
    }
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
      house: character.houseImage,
    };
    res.send(villager);
  });

  // add villager name to Villager table
  app.post("/api/character", (req, res) => {
    db.Villager.create(req.body).then((dbVillager) => res.json(dbVillager));
  });

  // get all villagers from villagers table associated with users UserId
  app.get("/api/favorites/:id", (req, res) => {
    db.Villager.findAll({
      where: { UserId: req.params.id },
      include: [db.User],
    }).then((result) => res.json(result));
  });

  // update username from users table associated with users id
  app.put("/api/username", (req, res) => {
    db.User.update(
      {
        username: req.body.username,
      },
      {
        where: { id: req.body.id },
      }
    )
      .then((result) => res.json(result))
      .catch((err) => {
        console.log(err);
      });
  });

  // delete villager from villagers table associated with users UserId
  app.delete("/api/delete/:id", function (req, res) {
    db.Villager.destroy({
      where: { id: req.params.id },
      include: [db.User],
    })
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  });
};
