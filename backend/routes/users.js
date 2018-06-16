const express = require('express');

const router = express.Router();

const UserController = require('../controllers/user')


router.post("/api/users", UserController.createUser);


router.get('/api/users', UserController.getUsers);

router.delete('/api/users/:id', UserController.deteleUser);

module.exports = router;

