const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const checkSession = require('../middleware/checkSession.middleware');
const { createProductController, getAllProductsController } = require('../controllers/product.controller');


router.post('/addProduct', checkSession, createProductController);
router.get('/getAllProducts', getAllProductsController)

module.exports = {
    addProduct:router,
    getAllProducts:router
}