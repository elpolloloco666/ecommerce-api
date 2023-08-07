const Joi = require('joi');

const id = Joi.number().integer();
const total = Joi.number().min(10);
const customerId = Joi.number().integer();
const date = Joi.date();

const createOrderSchema = Joi.object({
  total: total.required(),
  customerId: customerId,
  date: date
});

const updateOrderSchema = Joi.object({
  total: total,
  customerId: customerId,
  date: date
});

const getOrderSchema = Joi.object({
  id: id.required()
});

module.exports = {createOrderSchema,updateOrderSchema,getOrderSchema};
