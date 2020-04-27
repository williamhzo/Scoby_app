require('dotenv').config();
const mongoose = require("mongoose");
const Item = require("../models/Item");

const items = [{
        name: "Ficus",
        image: "https://as2.ftcdn.net/jpg/03/24/61/99/500_F_324619996_hMZLHS9RXcewhf9rlLrIQnPuZdL3RdLy.jpg",
        description: "This one's most likely to turn big.",
        category: ["Plant"],
        quantity: 2,
    },
    {
        name: "Cactus",
        image: "https://images.pexels.com/photos/1253718/pexels-photo-1253718.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Grow them at home",
        category: ["Plant"],
        quantity: 10,
    },
    {
        name: "Kombucha",
        image: "https://as1.ftcdn.net/jpg/03/21/27/28/500_F_321272862_PpUiF3qLeKHTBWbNspa2KHHdT58wHQOW.jpg",
        description: "A bit of fizz for your tastebuds",
        category: ["Kombucha"],
        quantity: 1,
    }
]

mongoose
    .connect(process.env.MONGO_URI)
    .then((self) => {
        console.log(`Connected to ${self.connection.name}`);
        Item.create(items)
            .then(items => {
                items.forEach(item => {
                    console.log(item);
                })
            })
            .catch(dbErr => {
                console.log(dbErr);
            })
    })
    .catch(dbErr => {
        console.log(dbErr);
    });