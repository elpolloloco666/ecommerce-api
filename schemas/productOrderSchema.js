const Joi = require('joi');

const id = Joi.number().integer();
const orderId = Joi.number().integer();
const prodctId = Joi.number().integer();
const amount = Joi.number().integer();

const itemSchema = Joi.object({
  orderId: orderId.required(),
  productId: prodctId.required(),
  amount: amount.required()
});

const createProductItemSchema = Joi.object({
  items: Joi.array().items(itemSchema).required()
});

const updateProductItemSchema = Joi.object({
  amount: amount
});

const getProductItemSchema = Joi.object({
  id: id.required()
});

module.exports = { createProductItemSchema, updateProductItemSchema, getProductItemSchema }

