

const User = require('../models/user');


exports.createUser = (req, res, next) => {
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

}

exports.getUsers = (req, res, next) => {
    User.find()
        .then(docs => {
            res.status(200).json({
                message: "Fetching data from server!",
                users: docs
            });
        });
}

exports.deteleUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ massage: "Post deleted!" }
        );
    });
}