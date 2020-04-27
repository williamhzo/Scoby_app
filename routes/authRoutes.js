const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;