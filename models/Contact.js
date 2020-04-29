const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const contactSchema = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  email: String, //optional: if user provides another contact email
  phoneNumber: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;