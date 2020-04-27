require('dotenv').config();
const mongoose = require("mongoose");
const User = require("../models/User");

const users = [{
    firstName: 'William',
    lastName: 'Hermozo',
    email: 'william@scoby.life',
    city: 'Toulouse'
}, {
    firstName: 'Rebecca',
    lastName: 'Norén',
    email: 'rebecca@scoby.life',
    city: 'Stockholm'
}, {
    firstName: 'Florian',
    lastName: 'Jomain',
    email: 'florian@scoby.life',
    city: 'Paris'
}]

mongoose
    .connect("mongodb://localhost:27017/app_db")
    .then((self) => {
        console.log(`Connected to ${self.connection.name}`);
        User.create(users)
            .then(users => {
                users.forEach(user => {
                    console.log(user);
                })
            })
            .catch(dbErr => {
                console.log(dbErr);
            })
    })
    .catch(dbErr => {
        console.log(dbErr);
    });