const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const itemSchema = new Schema({
  name: String,
  image: String,
  description: String,
  category: [{
    type: String,
    enum: ['Plant', 'Kombucha', 'Kefir', 'Vinegar']
  }],
  quantity: Number,
  coordinates: {
    type: String
  },
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;