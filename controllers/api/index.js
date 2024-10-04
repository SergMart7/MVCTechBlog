const router = require("express").Router();
const path = require('path');

// Using absolute paths to require route modules
const userRoutes = require(path.join(__dirname, 'userRoutes'));
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
