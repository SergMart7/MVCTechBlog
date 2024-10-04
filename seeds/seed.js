const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  try {

    // Synchronize all models with the database

    await sequelize.sync({ force: true });

    // Seed users data

    const users = await User.bulkCreate(userData, {
      individualHooks: true, // Runs hooks like password hashing for each user
      returning: true,
    });

    // Seed posts data with random user associations

    for (const post of postData) {
      await Post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    // Seed comments data

    await Comment.bulkCreate(commentData);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed database:", error);
    process.exit(1);
  }
};

seedDatabase();
