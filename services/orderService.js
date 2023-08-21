const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

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
    await models.ProductsOrders.bulkCreate(body.items,(err,results)=>{
      if (err) {
        boom.badRequest(err);
        return;
      }else{
        return results;
      }
    })
  }
}

module.exports = orderService;
