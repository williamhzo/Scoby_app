const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const uploadCloud = require('../config/cloudinary.js');

// Add new item page
router.get('/add-item', (req, res, next) => {
  res.render('./items/itemForm');
});

// Create new item form
router.post('/add-new-item', uploadCloud.single('image'), (req, res, next) => {
  Item.create(req.body)
    .then((dbResult) => {
      Item.find({})
        .then((dbResult) => {
          res.render('./items/itemForm', {
            items: dbResult,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
