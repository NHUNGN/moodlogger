const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Test route
router.get('/test', (req, res) => {
  res.send('✅ Auth route is working');
});

// Signup route
router.post('/signup', async (req, res) => {
  console.log('🔁 Signup route hit');
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('⚠️ Missing fields');
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    console.log('🔍 Checking existing user');
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      console.log('🚫 User already exists:', email);
      return res.status(400).json({ message: 'Email already in use.' });
    }

    console.log('🔐 Hashing password');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('🆕 Creating new user');
    const newUser = await User.create({ email, password: hashedPassword });

    console.log('✅ User created:', newUser.email);
    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET || 'temp_secret',
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User created successfully!', token });
  } catch (err) {
    console.error('❌ Error signing up:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  console.log('🔐 Login attempt');
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('⚠️ Missing credentials');
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('❌ No user found with email:', email);
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('❌ Incorrect password');
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'temp_secret',
      { expiresIn: '1h' }
    );

    console.log('✅ Login successful:', email);
    res.status(200).json({ message: 'Login successful!', token });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;
