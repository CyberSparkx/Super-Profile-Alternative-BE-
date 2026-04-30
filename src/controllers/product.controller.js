
const Product = require('../models/product.model');


const createProductController = async (req, res) => {
    const {name,price,description,imageUrl,category} = req.body;

    try {
        const newProduct = new Product({
        name,
        price,
        description,
        imageUrl,
        category
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
   
}

module.exports = {
    createProductController
}