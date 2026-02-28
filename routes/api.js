const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// API Integration Requirement
router.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.json({ success: true, count: products.length, data: products });
});

module.exports = router;