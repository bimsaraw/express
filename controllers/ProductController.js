const Product = require('../models/Product');

const createProduct = async (req, res) => {
    const { name, price, description, qty } = req.body;

    try {
        const product = new Product();
        product.name = name;
        product.price = price;
        product.description = description;
        product.qty = qty;

        await product.save();

        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
}

//get products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = {
    createProduct,
    getProducts,
    getProductById
}