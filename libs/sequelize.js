const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');
require('dotenv').config();

const USER = encodeURIComponent(process.env.DB_USER);
const PASS = encodeURIComponent(process.env.DB_PASSWORD);
const URI = `postgres://${USER}:${PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
});

setupModels(sequelize);

module.exports = sequelize;
