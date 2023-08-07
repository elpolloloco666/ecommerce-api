'use strict';
const { Sequelize, DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('../models/customerModel');
const { PRODUCT_TABLE } = require('../models/productModel');
const { CATEGORY_TABLE } = require('../models/categoryModel');
const { ORDER_TABLE } = require('../models/orderModel');
const { PRODUCTS_ORDERS_TABLE } = require('../models/productsOrdersModel');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(CUSTOMER_TABLE,{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first_name:{
        allowNull:false,
        type: DataTypes.STRING(32)
      },
      last_name: {
        allowNull:false,
        type: DataTypes.STRING(32)
      },
      email: {
        allowNull:false,
        unique:true,
        type: DataTypes.STRING(50),
      },
      password: {
        allowNull:false,
        type: DataTypes.STRING,
      },
      role:{
        allowNull:true,
        type:DataTypes.STRING(10),
        defaultValue: 'customer'
      }
    });

    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(32)
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING
      }
    });

    await queryInterface.createTable(PRODUCT_TABLE,{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(40),
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'category_id',
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      featured: {
        allowNull: true,
        default: false,
        type: DataTypes.BOOLEAN
      }
    });

    await queryInterface.createTable(ORDER_TABLE,{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      total:{
        allowNull: false,
        type: DataTypes.FLOAT
      },
      customerId:{
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references:{
          model:'customers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      date: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    }
    );

    await queryInterface.createTable(PRODUCTS_ORDERS_TABLE,{
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      orderId: {
        field: 'order_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      productId: {
        field: 'product_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(PRODUCTS_ORDERS_TABLE);
  }
};
