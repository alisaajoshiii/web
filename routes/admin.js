const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Product, Order, User } = require('../models');

// Configure upload
const storage = multer.diskStorage({
  destination: 'public/images/products/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Admin Middleware
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Forbidden: Admins only');
  }
};

router.use(isAdmin);

router.get('/', async (req, res) => {
  const productCount = await Product.count();
  const orderCount = await Order.count();
  const userCount = await User.count();
  const recentOrders = await Order.findAll({ include: User, limit: 5, order: [['createdAt', 'DESC']] });
  res.render('admin/dashboard', { title: 'Admin Dashboard', productCount, orderCount, userCount, recentOrders });
});

router.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.render('admin/products', { title: 'Manage Products', products });
});

// Product CRUD
router.get('/products/new', (req, res) => {
  res.render('admin/product_form', { title: 'Add Product', product: null });
});

router.post('/products', upload.single('image'), async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file ? req.file.filename : 'placeholder.png';
  await Product.create({ name, description, price, category, image });
  res.redirect('/admin/products');
});

router.get('/products/edit/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.render('admin/product_form', { title: 'Edit Product', product });
});

router.post('/products/edit/:id', upload.single('image'), async (req, res) => {
  const { name, description, price, category } = req.body;
  const product = await Product.findByPk(req.params.id);
  
  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  if (req.file) {
    product.image = req.file.filename;
  }
  await product.save();
  res.redirect('/admin/products');
});

router.get('/products/delete/:id', async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.redirect('/admin/products');
});

// Order Management
router.get('/orders', async (req, res) => {
  const orders = await Order.findAll({ include: User, order: [['createdAt', 'DESC']] });
  res.render('admin/orders', { title: 'Manage Orders', orders });
});

module.exports = router;