// /controllers/postController.js
const { Post } = require('../models');

const createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id; // ID dari pengguna yang login
  
    // Pastikan userId dari token sama dengan userId dari body request
    if (userId !== req.body.userId) {
      return res.status(403).json({
        status: 'error',
        message: 'User ID from token does not match the user ID in the request',
      });
    }
  
    try {
      const newPost = await Post.create({
        title,
        content,
        userId,
      });
  
      res.status(201).json({
        status: 'success',
        message: 'Post created successfully!',
        post: newPost,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Error creating post',
        error: err.message,
      });
    }
  };
  

const getPosts = async (req, res) => {
    const { userId } = req.query; // Mendapatkan parameter userId dari query
  
    try {
      const queryOptions = {
        include: [{
          model: require('../models').User,
          as: 'user',
          attributes: ['id', 'username', 'email'],
        }]
      };
  
      // Jika userId ada dalam query, filter berdasarkan userId
      if (userId) {
        queryOptions.where = { userId };
      }
  
      const posts = await Post.findAll(queryOptions);
  
      res.json({
        status: 'success',
        message: 'Posts retrieved successfully!',
        posts,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Error retrieving posts',
        error: err.message,
      });
    }
  };  

const getPostDetailByIdPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id, {
      include: [{
        model: require('../models').User,
        as: 'user',
        attributes: ['id', 'username', 'email'],
      }]
    });

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found',
      });
    }

    res.json({
      status: 'success',
      message: 'Post retrieved successfully!',
      post,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving post',
      error: err.message,
    });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, userId } = req.body;

  try {
    const post = await Post.findByPk(id);
    
    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found',
      });
    }

    await post.update({
      title,
      content,
      userId,
    });

    res.json({
      status: 'success',
      message: 'Post updated successfully!',
      post,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating post',
      error: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found',
      });
    }

    await post.destroy();

    res.json({
      status: 'success',
      message: 'Post deleted successfully!',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting post',
      error: err.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostDetailByIdPost,
  updatePost,
  deletePost,
};
