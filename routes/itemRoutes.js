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
  const id_user = res.locals.user._id

  Item.create({
      ...req.body,
      id_user
    })
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

router.get('/personal', (req, res, next) => {
  Item
    .find({
      id_user: res.locals.user._id
    })
    .then(item => {
      res.render("personal", {
        item: item
      });
    })
    .catch(next);
})

router.get("/personal/:id", (req, res, next) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/personal");
    })
    .catch(next);
});


module.exports = router;