const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new comment

router.post("/", withAuth, async (req, res) => {
  try {

    // Create a new comment and associate it with the logged-in user
    
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
});

module.exports = router;
