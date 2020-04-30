const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// Create Account Page
router.get('/create-account', (req, res, next) => {
  res.render('./auth/createAccount.hbs');
});

// Create Account Form
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
      req.flash("error", "Email already taken");
      return res.redirect("/create-account");
    }
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      firstName,
      email,
      lastName,
      password: hashedPassword,
    });
    req.session.currentUser = newUser;
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

// Log in Page
router.get('/login', (req, res, next) => {
  res.render('./auth/login.hbs');
});

// Log in Form
router.post("/login", async (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  try {
    const foundUser = await User.findOne({
      email
    });
    if (!foundUser) {
      req.flash("error", "Invalid credentials (no user)");
      return res.redirect("/login");
    }
    if (!bcrypt.compareSync(password, foundUser.password)) {
      // req.flash("error", "Invalid credentials");
      req.flash("error", "Invalid credentials (wrong password)");
      return res.redirect("/login");
    }
    req.session.currentUser = foundUser;
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;