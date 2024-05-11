const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('./controllers/UserController.js');
const { createProduct, getProducts, getProductById } = require('./controllers/ProductController.js');
const { createOrder, addProductToOrder } = require('./controllers/OrderController.js');
const { login } = require('./controllers/AuthController.js');
const { verifyJwtToken } = require('./security/security.js');

//authRoutes
router.post('/auth/login', login);

//middleware - applies to all routes below this line
router.use(verifyJwtToken);

//userRoutes
router.post('/users', createUser);
router.get('/users', getUsers);

//productRoutes
router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

//orderRoutes
router.post('/orders', createOrder);
router.post('/orders/:id/products', addProductToOrder);



module.exports = router;