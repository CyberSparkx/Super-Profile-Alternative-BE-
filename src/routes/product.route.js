const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const checkSession = require('../middleware/checkSession.middleware');
const { createProductController, getAllProductsController, getSpecificProductController, updateProductController, deleteProductController } = require('../controllers/product.controller');


router.post('/addProduct', checkSession, createProductController);
router.get('/getAllProducts', getAllProductsController)
router.get('/getSpecificProduct/:id', getSpecificProductController);
router.put('/updateProduct/:id', checkSession, updateProductController);
router.delete('/deleteProduct/:id', checkSession, deleteProductController);

module.exports = {
    addProduct:router,
    getAllProducts:router,
    getSpecificProduct:router,
    updateProduct:router,
    deleteProduct:router
}