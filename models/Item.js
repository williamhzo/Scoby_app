const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const geocoder = require('../middlewares/geocoder');

const itemSchema = new mongoose.Schema({
  name: String,
  image: {
    type: String,
    default:
      'https://cdn1.iconfinder.com/data/icons/gardening-filled-line/614/1935_-_Growing_Plant-512.png',
  },
  description: String,
  category: [
    {
      type: String,
      enum: ['Plant', 'Kombucha', 'Kefir', 'Vinegar'],
    },
  ],
  quantity: Number,
  contact: String,
  address: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

// geocode middleware
itemSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].latitude, loc[0].longitude],
    formattedAddress: loc[0].formattedAddress,
  };
  next();
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
