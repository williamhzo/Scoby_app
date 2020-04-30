const express = require('express');
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const Item = require('../models/Item');
const Contact = require('../models/Contact');
const uploadCloud = require('../config/cloudinary.js');
const User = require("../models/User");

//FORM TO ADD NEW CONTACT INFORMATION
router.post('/add-contact', requireAuth, (req, res, next) => {
  const id_user = res.locals.user._id;
  Contact.create({
      ...req.body,
      id_user
    })
    .then((dbResult) => {
      res.redirect('/personal')
    })
    .catch((err) => {
      console.log(err);
    });
});


//PAGE TO DISPLAY PERSONAL ITEMS AND PHONE NUMBER
router.get('/personal', requireAuth, (req, res, next) => {
  Promise.all([Item.find({
      id_user: res.locals.user._id
    }), Contact.find({
      id_user: res.locals.user._id
    })])
    .then((result) => {
      res.render('personal', {
        item: result[0],
        contact: result[1],
      });
    })
    .catch(next);
});

router.get('/personal/edit-profile/:id', requireAuth, (req, res, next) => {
  Promise.all([Item.find({
      id_user: res.locals.user._id
    }), Contact.find({
      id_user: res.locals.user._id
    })])
    .then((result) => {
      res.render('edit-profile', {
        item: result[0],
        contact: result[1],
      });
    })
    .catch(next);
});

// UPDATE PERSONAL INFORMATION
router.post('/update-account', requireAuth, uploadCloud.single('profileImg'), (req, res, next) => {
  const {
    firstName,
    lastName
  } = req.body;

  let updatedProfile = {
    firstName,
    lastName,
  }
  if (req.file) {
    const profileImg = req.file.secure_url;
    updatedProfile = {
      ...updatedProfile,
      profileImg
    }
  }
  User.findByIdAndUpdate(
      req.session.currentUser._id, updatedProfile, {
        new: true
      }
    )
    .then((dbResult) => {
      req.session.currentUser = dbResult;
      res.redirect('/personal/edit-profile/' + req.session.currentUser._id)
    })
    .catch((err) => {
      console.log(err);
    });
});


// UPDATE PHONE NUMBER
router.post('/update-phoneNumber', requireAuth, (req, res, next) => {
  const id_user = res.locals.user._id;
  Contact.findOne({
      id_user: id_user
    }).then(contact => {
      Contact.findByIdAndUpdate(
          contact._id, req.body, {
            new: true
          }
        )
        .then((dbResult) => {
          res.redirect('/personal/edit-profile/' + req.session.currentUser._id)
        })
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;