const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./models/User');

const itemSchema = new Schema({
    name: String,
    image: String,
    description: String,
    quantity: Number, // In case we want to add that
    category: [String], // That's if we want to expand and add kombucha or vinegar mothers
    userContact: [
        address: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        phone: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;