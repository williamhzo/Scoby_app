require("dotenv").config();
require("./config/mongodb");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const app = express();

// SASS SETUP
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

// VIEW ENGINE SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

// INITIAL CONFIG
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60,
    }),
    saveUninitialized: true,
    resave: true,
  })
);

// SESSION
app.use((req, res, next) => {
  if (req.session.currentUser) {
    res.locals.user = req.session.currentUser
    res.locals.isLoggedIn = true;
  } else {
    res.locals.isLoggedIn = false;
  }
  next();
});

// FLASH
app.use(flash());
app.use((req, res, next) => {
  // res.locals.success_msg = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ROUTES CONFIG
const indexRouter = require("./routes/indexRoutes");
const authRouter = require("./routes/authRoutes");
const itemRouter = require("./routes/itemRoutes");
const personalRouter = require("./routes/personalRoutes");
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", itemRouter);
app.use("/", personalRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;