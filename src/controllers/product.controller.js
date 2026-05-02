
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



const getSpecificProductController = async (req, res) => {
    const {id} = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error',  error : error.message });
    }

}

const updateProductController = async (req, res) => {
    const {id} = req.params;
    const {title,price,description,imageUrl,category} = req.body;

    try {

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, price: { amount: price.amount }, description, imageUrl, category },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error',  error : error.message });
    }
}

const deleteProductController = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error',  error : error.message });
    }
}

module.exports = {
    createProductController,
    getAllProductsController,
    getSpecificProductController,
    updateProductController,
    deleteProductController
}