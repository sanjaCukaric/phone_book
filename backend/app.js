const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

mongoose.connect('mongodb+srv://sanja:XCOkAwIbBlmeDVvK@cluster0-gyfg3.mongodb.net/phoneBook?retryWrites=true')
    .then(() => {
        console.log('Connected!')
            .catch(() => {
                console.log("Connection failed!")
            })
    })

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next();
})

app.post("/api/users", (req, res, next) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
    });
    user.save().then(createdUser =>
        res.status(201).json({
            message: 'User added!',
            userId: createdUser._id
        })
    );

})


app.get('/api/users', (req, res, next) => {
    User.find()
        .then(docs => {
            res.status(200).json({
                message: "Fetching data from server!",
                users: docs
            });
        });
});

app.delete('/api/users/:id', (req, res, next) => {
    User.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ massage: "Post deleted!" }
        );
    });
})

module.exports = app;

