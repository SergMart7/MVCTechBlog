const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new post

router.post("/", withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Check if title and content are provided

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Create new post associated with the logged-in user

    const newPost = await Post.create({ 
      title, 
      content, 
      user_id: req.session.user_id 
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
});

// Route to update an existing post

router.put("/:id", withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Ensure the post exists and belongs to the user

    const updatedPost = await Post.update(
      { title, content },
      { where: { id: req.params.id, user_id: req.session.user_id } }
    );

    if (!updatedPost[0]) {
      return res.status(404).json({ message: "No post found with this id!" });
    }

    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
});

// Route to delete a post

router.delete("/:id", withAuth, async (req, res) => {
  try {

    // Ensure the post exists and belongs to the user before deleting

    const postData = await Post.destroy({
      where: { id: req.params.id, user_id: req.session.user_id }
    });

    if (!postData) {
      return res.status(404).json({ message: "No post found with this id!" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
});

module.exports = router;
