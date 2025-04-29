const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // Assuming you export models this way

const router = express.Router();

// Handle signup requests
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation for empty fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ email, password: hashedPassword });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send response with token
    res.status(201).json({ message: 'User created successfully!', token });
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;
