const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class customerService {

  async getAllCustomers(){
    const data = await models.Customer.findAll();
    return data;
  }

  async getOneCustomer(id){
    const data = await models.Customer.findByPk(id);
    if(data) {
      delete data.dataValues.password;
      return data;
    }
    else {
      throw boom.notFound('Customer not found');
    }
  }

  async getCustomerEmail(email){
    const data = await models.Customer.findOne({where:{email}});
    return data;
  }

  async createCustomer(customerData){
    const hash = await bcrypt.hash(customerData.password,10);
    const newCustomer = await models.Customer.create({...customerData,password:hash});
    delete newCustomer.dataValues.password;
    return newCustomer;
  }

  async updateCustomer(id,customerData){
    const customer = await this.getOneCustomer(id);
    if(customer){
      const updatedCustomer = await customer.update(customerData);
      return updatedCustomer;
    }else throw boom.notFound('product not found');
  }

  async deleteCustomer(id){
    const customer = await this.getOneCustomer(id);
    if(customer){
      const deletedCustomer = await customer.destroy();
      return id;
    }else throw boom.notFound('customer not found');

  }


}

module.exports = customerService;
