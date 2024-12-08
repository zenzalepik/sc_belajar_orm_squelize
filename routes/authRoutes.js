// /routes/authRoutes.js
const express = require('express');
const { authenticateToken, register, login } = require('../controllers/authController');

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);

// Menambahkan middleware authenticateToken ke rute yang memerlukan autentikasi
router.use(authenticateToken);

module.exports = router;
