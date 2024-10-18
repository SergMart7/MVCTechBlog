const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  // Use DB_URL for Render deployment
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Render uses self-signed certificates
      }
    },
    logging: false // Disable logging in production
  });
} else {
  // Local development fallback
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: process.env.DB_PORT || 5432,
      logging: false // Disable logging in development
    }
  );
}

module.exports = sequelize;
