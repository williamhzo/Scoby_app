const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require('./Item');

const userSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    icon: String, // Just adding this in case we want to add profile pictures
    id_item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;