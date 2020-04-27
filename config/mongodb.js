const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then((self) => {
        console.log(`Connected to ${self.connection.name}`);
    })
    .catch((err) => {
        console.log(`An error occured while connecting to the database...`);
    });