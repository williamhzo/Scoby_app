const express = require('express');
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const Item = require('../models/Item');
const Contact = require('../models/Contact');
const uploadCloud = require('../config/cloudinary.js');

// Add new item page
router.get('/add-item', requireAuth, (req, res, next) => {
  Contact.find({
      id_user: res.locals.user._id
    })
    .then((dbresult) => {
      res.render('./items/itemForm', {
        contact: dbresult
      });
    })
    .catch(next)
});

// Create new item form
router.post('/', requireAuth, uploadCloud.single('image'), (req, res, next) => {
  const id_user = req.session.currentUser._id;

  if (req.file) {
    const image = req.file.secure_url;
    req.body = {
      ...req.body,
      image
    }
  }
  Item.create({
      ...req.body,
      id_user,
    })
    .then((dbResult) => {
      Item.find({})
        .then((dbResult) => {
          res.redirect('/');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE ITEMS
router.get('/personal/delete/:id', requireAuth, (req, res, next) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/personal');
    })
    .catch(next);
});

module.exports = router;