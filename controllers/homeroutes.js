const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Render the homepage with all posts
router.get("/", async (req, res) => {
  try {
    
    // Fetch all posts along with their authors' usernames

    const postData = await Post.findAll({
      include: { model: User, attributes: ["username"] },
    });
    
    // Serialize data for Handlebars template

    const posts = postData.map((post) => post.get({ plain: true }));
    
    // Render homepage and pass the posts data and login status

    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load homepage", error: err.message });
  }
});

// Render a single post with its comments and author details

router.get("/post/:id", async (req, res) => {
  try {

    // Fetch single post by its ID, including author and comments

    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: [User] },
      ],
    });

    if (!postData) {
      return res.status(404).json({ message: "No post found with this id!" });
    }
    
    // Serialize post data for Handlebars template

    const post = postData.get({ plain: true });

    // Render post details page and pass post data and login status

    res.render("post", { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load post", error: err.message });
  }
});

// Render the dashboard with posts created by the logged-in user

router.get("/dashboard", withAuth, async (req, res) => {
  try {

    // Fetch posts by the logged-in user

    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
    });

    // Serialize data for Handlebars template

    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard page with user's posts

    res.render("dashboard", { posts, logged_in: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load dashboard", error: err.message });
  }
});

// Render the login page or redirect to dashboard if already logged in

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/dashboard");
  }
  res.render("login");
});

// Render the signup page or redirect to dashboard if already logged in

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/dashboard");
  }
  res.render("signup");
});

module.exports = router;
