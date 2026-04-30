const express = require('express');
const router = express.Router();
const checkSession = require('../middleware/checkSession.middleware');
const { createProductController } = require('../controllers/product.controller');


router.post('/addProduct', checkSession , createProductController);