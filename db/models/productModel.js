const { Sequelize, DataTypes, Model } = require('sequelize');

const PRODUCT_TABLE = 'products';

const productSchema = {
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
}

class product extends Model {

  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
    this.hasMany(models.ProductsOrders,{as: 'productsOrders', foreignKey: 'productId'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }

}

module.exports = { PRODUCT_TABLE, productSchema, product };
