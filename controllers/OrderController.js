const Order = require('../models/Order');

const createOrder = async (req, res) => {
    const { user } = req.body;

    try {
        const order = new Order();

        order.user = user;
        await order.save();

        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
}

//Add products to order
const addProductToOrder = async (req, res) => {
    const orderId = req.params.id; //get orderId from path variable (URL)
    const { product, qty } = req.body; //get product and qty from request body

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).send('Order not found');
        }

        order.products.push({ product, qty });
        await order.save();

        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error);
    }

}

module.exports = {
    createOrder, addProductToOrder
}