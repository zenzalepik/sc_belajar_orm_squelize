// /routes/postRoutes.js
const express = require('express');
const { authenticateToken } = require('../controllers/authController');
const { createPost, getPosts, getPostDetailByIdPost, updatePost, deletePost } = require('../controllers/postController');

const router = express.Router();

// Menambahkan middleware authenticateToken ke rute yang memerlukan autentikasi
router.use(authenticateToken); // Middleware untuk semua rute berikutnya
router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPostDetailByIdPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
