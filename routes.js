const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('./controllers/UserController.js');

//userRoutes
router.post('/users', createUser);
router.get('/users', getUsers);

module.exports = router;