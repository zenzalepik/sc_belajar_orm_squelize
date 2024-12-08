// /app.js
const express = require('express');
const dotenv = require('./config/dotenv');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv(); // Load environment variables

const app = express();
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

module.exports = app;
