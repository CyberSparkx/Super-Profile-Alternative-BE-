
const Product = require('../models/product.model');


const createProductController = async (req, res) => {
    const {title,price,description,imageUrl,category} = req.body;

    try {
        const newProduct = new Product({
        title,
        price: { amount: price.amount },
        description,
        imageUrl,
        category
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error',  error : error.message });
    }
   
}

const getAllProductsController = async (req, res) => {

    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error',  error : error.message });
    }

}

module.exports = {
    createProductController,
    getAllProductsController
}