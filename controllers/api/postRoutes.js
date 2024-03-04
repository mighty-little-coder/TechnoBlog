// Purpose: to create the routes for the post model
const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route for creating new posts
router.post('/create-post', async (req, res) => {
  try {
    const newPost = await Post.create({
      post_title: req.body.post_title,
      post_body: req.body.post_body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update / edit a specific post
router.put('/update-post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.post_title = req.body.newTitle;
    post.post_body = req.body.newBody;

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
})

// DELETE route for posts
router.delete('/delete-post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.destroy();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST route for new comments
router.post('/create-comment', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.postId,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;