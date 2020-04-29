const express = require('express');
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const Item = require('../models/Item');
const Contact = require('../models/Contact');
const uploadCloud = require('../config/cloudinary.js');

// Add new item page
// router.get('/add-item', (req, res, next) => {
//   res.render('./items/itemForm');
// });

// Add new item page
router.get('/add-item', requireAuth, (req, res, next) => {
  Contact.find({
      id_user: res.locals.user._id
    })
    .then((dbresult) => {
      console.log(dbresult)
      console.log(dbresult.phoneNumber)
      res.render('./items/itemForm', {
        contact: dbresult
      });
    })
    .catch(next)
});



// Create new item form
router.post('/add-new-item', requireAuth, uploadCloud.single('image'), (req, res, next) => {
  const id_user = res.locals.user._id;
  const image = req.file.secure_url;
  Item.create({
      ...req.body,
      id_user,
      image,
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


router.post('/add-contact', requireAuth, (req, res, next) => {
  const id_user = res.locals.user._id;
  Contact.create({
      ...req.body,
      id_user
    })
    .then((dbResult) => {
      Contact.find({})
        .then((dbResult) => {
          res.redirect('/personal')
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});



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

router.get('/personal/delete/:id', requireAuth, (req, res, next) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/personal');
    })
    .catch(next);
});

module.exports = router;