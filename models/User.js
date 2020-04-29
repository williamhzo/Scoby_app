const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./Item');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  profileImg: {
    type: String,
    default: '/media/avatar.png'
  },
  email: String,
  password: String,
  city: String,
  id_contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  },
  id_item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
  },
  //   favorites: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: 'Item',
  //     },
  //   ], if we have time
});

const User = mongoose.model('User', userSchema);

module.exports = User;