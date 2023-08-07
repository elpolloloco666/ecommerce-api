const { Sequelize } = require('sequelize');
const setupModels = require('../db/models');
require('dotenv').config();


const URI = process.env.INTERNAL_URL;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
});

setupModels(sequelize);

module.exports = sequelize;
