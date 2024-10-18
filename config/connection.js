const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URI || 'postgres://localhost:5432/tech_blog_db', {
  dialect: 'postgres',
});

module.exports = sequelize;
