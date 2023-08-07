const { DataTypes, Model } = require('sequelize');

const CUSTOMER_TABLE = 'customers';

const customerSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName:{
    field: "first_name",
    allowNull:false,
    type: DataTypes.STRING(32)
  },
  lastName: {
    field: "last_name",
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
}

class customer extends Model {

  static associate(models){
    this.hasMany(models.Order, {foreignKey: 'customerId', as:'orders'})
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName:'Customer',
      timestamps: false
    }
  }
}

module.exports = {CUSTOMER_TABLE,customerSchema,customer};
