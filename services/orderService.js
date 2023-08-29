const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
const productService = require('../services/productService');

const product = new productService();

class orderService {

  async getAllOrders(){
    const order = await models.Order.findAll();
    return order;
  }

  async getOneOrder(id){
    const order = await models.Order.findByPk(id,{include:[
      {association:'customer',attributes:['id','first_name','last_name','email']},
      'products'
    ]});
    if(order) return order;
    else throw boom.notFound('order nout found');
  }

  async getOrdersByCustomer(customerId){
    const orders = await models.Order.findAll({where:{customerId},include:['products']});
    if(orders) return orders;
    else throw boom.notFound('orders not found');
  }

  async createOrder(customerId,data){
    const orderData = {customerId,...data};
    const newOrder = await models.Order.create(orderData);
    return newOrder;
  }

  async updateOrder(id,data){
    const order = await models.Order.findByPk(id);
    if(order){
      const updatedOrder = await order.update(data);
      return updatedOrder;
    }else throw boom.notFound('order not found');
  }

  async deleteOrder(id){
    const order = await models.Order.findByPk(id);
    if(order) {
      const deletedOrder = await order.destroy();
      return id;
    }else throw boom.notFound('order not found');

  }

  async createItem(body) {
    const items = body.items;
    const orderItems = await models.ProductsOrders.bulkCreate(items);
    for (const item of items) {
      const productData = await product.getOneProduct(item.productId);
      const stock = productData.stock;
      const currentStock = stock - item.amount;
      await product.updateProduct(item.productId, { stock: currentStock });
    }
    return orderItems;
  }
}

module.exports = orderService;
