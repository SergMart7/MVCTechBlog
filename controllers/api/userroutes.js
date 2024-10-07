const router = require("express").Router();
const { User } = require("../../models");

// Route for user sign up

router.post("/signup", async (req, res) => {
  try {

    // Create new user with the provided username and password

    const userData = await User.create(req.body);

    // Save user ID and login status in session

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(201).json(userData);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to sign up", error: err.message });
  }
});

// Route for user login

router.post("/login", async (req, res) => {
  try {

    // Find user by username

    const userData = await User.findOne({ where: { username: req.body.username } });

    // If user not found or password incorrect, return error

    if (!userData || !(await userData.checkPassword(req.body.password))) {
      return res.status(400).json({ message: "Incorrect username or password" });
    }

    // Save user ID and login status in session

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ message: "Logged in successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to log in", error: err.message });
  }
});

// Route for user logout

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => res.status(204).end());
  } else {
    res.status(404).end();
  }
});

module.exports = User;
