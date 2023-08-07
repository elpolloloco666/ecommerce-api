const { customerSchema, customer } = require('./customerModel');
const { productSchema, product } = require('./productModel');
const { categorySchema, category } = require('./categoryModel');
const { orderSchema, order } = require('./orderModel');
const { productsOrdersSchema, productsOrders } = require('./productsOrdersModel');

const setupModels = (sequelize) => {
  customer.init(customerSchema, customer.config(sequelize));
  product.init(productSchema, product.config(sequelize));
  category.init(categorySchema, category.config(sequelize));
  order.init(orderSchema, order.config(sequelize));
  productsOrders.init(productsOrdersSchema,productsOrders.config(sequelize));

  category.associate(sequelize.models);
  product.associate(sequelize.models);
  customer.associate(sequelize.models);
  order.associate(sequelize.models);
}

module.exports = setupModels;
