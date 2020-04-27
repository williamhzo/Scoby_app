const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

router.get('/create-account', (req, res, next) => {
  res.render('./auth/createAccount.hbs');
});

router.post("/create-account", async (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    password
  } = req.body;

  try {
    const foundUser = await User.findOne({
      email: email
    });
    if (foundUser) {
      // req.flash("error", "Email already taken");
      // req.session.errorMessage = {
      //   status: 401,
      //   text: "Email already taken."
      // };
      return res.redirect("/create-account");
    }
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);
    await User.create({
      firstName,
      email,
      lastName,
      password: hashedPassword,
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

router.get('/login', (req, res, next) => {
  res.render('./auth/login.hbs');
});

module.exports = router;