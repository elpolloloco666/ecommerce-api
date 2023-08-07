'use strict';

const bcrypt = require('bcrypt');
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = process.env.ADMIN_PASSWORD;
    const hash = await bcrypt.hash(password,10);
    await queryInterface.bulkInsert('customers',[{
      "first_name": "Enrique",
      "Last_name": "Acosta",
      "email": "elpolloloco743@gmail.com",
      "password": hash,
      "role": "admin"
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
