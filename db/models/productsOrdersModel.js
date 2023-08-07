const { Model, DataTypes } = require('sequelize');

const PRODUCTS_ORDERS_TABLE = 'products_orders';

const productsOrdersSchema = {
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
}

class productsOrders extends Model {

  static associate(models) {
  }

  static config(sequelize) {
    return{
      sequelize,
      tableName: PRODUCTS_ORDERS_TABLE,
      modelName: 'ProductsOrders',
      timestamps: false
    }
  }

}


module.exports = { PRODUCTS_ORDERS_TABLE, productsOrdersSchema, productsOrders };
