const router = require('express').Router();
const { Project, User } = require('../models');

// Render homepage
router.get('/', async (req, res) => {
  try {
    const projectData = await Project.findAll({
      include: [{ model: User }],
    });

    const projects = projectData.map((project) => project.get({ plain: true }));
    res.render('homepage', { projects });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
