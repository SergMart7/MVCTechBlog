const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  // For production environment using DATABASE URL (e.g., from Render)
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Disable logging for production, enable if needed
    dialectOptions: {
      ssl: {
        require: true, // Enforce SSL for secure connection in production
        rejectUnauthorized: false // Required for Render's self-signed SSL certs
      }
    }
  });
} else {
  // For local development environment
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: process.env.DB_PORT || 5432,
      logging: false 
    }
  );
}

module.exports = sequelize;
