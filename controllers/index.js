const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const userRoutes = require("./api/userRoutes");

// Use the API routes for paths that start with /api

router.use("/api", apiRoutes);

// Use the home routes for all other paths

router.use("/", homeRoutes);

router.use("/api/users", userRoutes);

// If no routes are hit, send a 404 status

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
