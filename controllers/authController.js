const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer token' format

  if (!token) return res.status(401).json({ status: 'error', message: 'Token is required' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ status: 'error', message: 'Invalid token' });

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    req.user = user;
    next();
  });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists!' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully!',
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error registering user', error: err.message 
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expired in 1 hour
    );

    res.json({
      status: 'success',
      message: 'Login successful',
      token,
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error logging in', error: err.message 
    });
  }
};

module.exports = { authenticateToken, register, login };
