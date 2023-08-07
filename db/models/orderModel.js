const { Sequelize ,Model, DataTypes } = require('sequelize');

const ORDER_TABLE = 'orders';


const orderSchema = {
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

class order extends Model {
  static associate(models){
    this.belongsTo(models.Customer, {as: 'customer'});
    this.belongsToMany(models.Product,{
      as:'products',
      through: models.ProductsOrders,
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
  }

  static config(sequelize) {
    return{
      sequelize,
      tableName: ORDER_TABLE,
      modelName:'Order',
      timestamps: false
    }
  }
}

module.exports = { ORDER_TABLE, orderSchema, order };
