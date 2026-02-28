const express = require('express');
const router = express.Router();
const { Product } = require('../models');

router.get('/', async (req, res) => {
  const products = await Product.findAll({ limit: 4 });
  res.render('index', { title: 'Aura Sissies - Home', products });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

router.post('/contact', (req, res) => {
  // Mock email notification
  console.log('Contact Form Submitted:', req.body);
  res.render('contact', { title: 'Contact Us', message: 'Thank you for contacting us! We will get back to you soon.' });
});

router.get('/game', (req, res) => {
  res.render('game', { title: 'Play & Earn Gems!' });
});

router.post('/game/earn', async (req, res) => {
  if (!req.session.user) return res.json({ success: false, message: 'Must be logged in' });
  const { User } = require('../models');
  const user = await User.findByPk(req.session.user.id);
  user.gems += 5; // Earn 5 gems
  await user.save();
  res.json({ success: true, gems: user.gems });
});

module.exports = router;