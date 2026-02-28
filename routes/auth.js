const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { User } = require('../models');

router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login', errors: null });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = { id: user.id, name: user.name, role: user.role };
    return res.redirect('/');
  }
  res.render('auth/login', { title: 'Login', errors: [{ msg: 'Invalid credentials' }] });
});

router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register', errors: null });
});

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('auth/register', { title: 'Register', errors: errors.array() });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    req.session.user = { id: user.id, name: user.name, role: user.role };
    res.redirect('/');
  } catch (err) {
    res.render('auth/register', { title: 'Register', errors: [{ msg: 'Email already exists' }] });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/profile', async (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');
  const user = await User.findByPk(req.session.user.id);
  res.render('auth/profile', { title: 'My Profile', user, errors: null, success: null });
});

router.post('/profile', async (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');
  const { name } = req.body;
  await User.update({ name }, { where: { id: req.session.user.id } });
  req.session.user.name = name;
  const user = await User.findByPk(req.session.user.id);
  res.render('auth/profile', { title: 'My Profile', user, success: 'Profile updated successfully!', errors: null });
});

module.exports = router;