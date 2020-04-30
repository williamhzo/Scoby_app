const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Contact = require('../models/Contact');

router.get('/', (req, res, next) => {
  res.render('home');
});

// Axios route
router.get('/items', (req, res, next) => {
  Item.find()
    .populate('id_user')
    .then((response) => {
      res.send(response);
      console.log('response after populate:', response);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

// About page

router.get('/about', (req, res, next) => {
  res.render('about');
});