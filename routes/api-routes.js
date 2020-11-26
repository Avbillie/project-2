/* eslint-disable no-unused-vars */
// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const moment = require("moment");
const { Op } = require("sequelize");
const Amadeus = require("amadeus");
const axios = require("axios");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res
      .json({
        username: req.body.username,
        email: req.user.email,
        id: req.user.id
      })
      .catch(err => {
        console.log(503, err);
      });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    //const credentials = JSON.parse(req.body.username);

    db.User.findOne({
      where: {
        [Op.or]: [{ username: req.body.username }, { email: req.body.email }]
      }
    }).then(data => {
      if (!data) {
        db.User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })
          .then(() => res.status(201).end())
          .catch(err => {
            console.log(err);
          });
      } else {
        res.status(409).end();
      }
      console.log(data);
    });
  });

  app.post("/api/blog", (req, res) => {
    db.Blog.create({
      username: req.user.username,
      title: req.body.title,
      text: req.body.text
    })
      .then(() => {
        res.redirect(307, "/api/members");
      })
      .catch(err => {
        console.log(503, err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  app.post("/api/amadeus", (req, res) => {
    const apiKey = "df40e453f18e8b1150a67320b38cc787";

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&appid=${apiKey}`;

    axios.get(queryURL).then(response => {
      const amadeus = new Amadeus({
        clientId: "f7Xk43X6vCKy4bTzLXcc3zIrxJfKnhnq",
        clientSecret: "hAaRJxTcBtZwByh3"
      });
      amadeus.shopping.activities
        .get({
          latitude: response.data.coord.lat,
          longitude: response.data.coord.lon
        })
        .then(response => {
          console.log(response);
          res.json(response.data);
        })
        .catch(response => {
          res.status(500).end();
          console.error(response);
        });
    });
  });

  // rendering the blogs to the handlebars engine
  app.get("/blogs", (req, res) => {
    db.Blog.findAll()
      .then(data => {
        console.log(data);
        res.render("index", { blogs: data.map(blog => blog.dataValues) });
      })
      .catch(err => {
        // console.log(err);
        res.status(500);
      });
  });
};
