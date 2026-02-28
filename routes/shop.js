const express = require('express');
const router = express.Router();
const { Product, Order, OrderItem } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  let whereClause = {};
  if (req.query.search) {
    whereClause.name = { [Op.like]: '%' + req.query.search + '%' };
  }
  if (req.query.category) {
    whereClause.category = req.query.category;
  }
  
  const products = await Product.findAll({ where: whereClause });
  res.render('shop/index', { title: 'Shop', products, search: req.query.search });
});

router.get('/product/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.render('shop/product', { title: product.name, product });
});

router.post('/cart/add', async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findByPk(productId);
  if (!product) return res.redirect('/shop');
  
  if (!req.session.cart) req.session.cart = [];
  
  const existingItem = req.session.cart.find(item => item.product.id == productId);
  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    req.session.cart.push({ product, quantity: parseInt(quantity) });
  }
  
  res.redirect('/shop/cart');
});

router.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  res.render('shop/cart', { title: 'Shopping Cart', cart, total });
});

router.post('/checkout', async (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');
  const cart = req.session.cart || [];
  if (cart.length === 0) return res.redirect('/shop/cart');
  
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const order = await Order.create({
    userId: req.session.user.id,
    totalAmount: total,
    status: 'Pending',
    paymentStatus: 'Paid' // Simulated Stripe payment
  });
  
  for (let item of cart) {
    await OrderItem.create({
      orderId: order.id,
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price
    });
  }
  
  req.session.cart = []; // clear cart
  res.render('shop/success', { title: 'Order Successful', orderId: order.id });
});

module.exports = router;