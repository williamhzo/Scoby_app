const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', (req, res, next) => {
  res.render('home');
});

// Axios route
router.get('/items', (req, res, next) => {
  Item.find()
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

// About page

router.get('/about', (req, res, next) => {
  res.render('about');
})