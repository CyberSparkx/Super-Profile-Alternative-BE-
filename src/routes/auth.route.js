const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerController, loginController, loginWithTokenController } = require('../controllers/auth.controller');

// Register route
router.post('/register',registerController);

// Login route
router.post('/login',loginController);

//login with tocken
router.get('/login',loginWithTokenController );

module.exports = {
    registerRoute : router,
    loginRoute : router,
    loginWithTokenRoute : router
};
