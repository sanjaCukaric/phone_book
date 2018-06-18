const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

const usersRoutes = require("./routes/users")

mongoose.connect('mongodb+srv://sanja:' + process.env.MONGO_ATLAS_PW + '@cluster0-gyfg3.mongodb.net/phoneBook?retryWrites=true')
    .then(() => {
        console.log('Connected!')
    })
    .catch(() => {
        console.log("Connection failed!")

    })

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE")
    next();
})

app.use(usersRoutes);

module.exports = app;

