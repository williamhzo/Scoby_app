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

router.get('/login', (req, res, next) => {
  res.render('./auth/login.hbs');
});

module.exports = router;