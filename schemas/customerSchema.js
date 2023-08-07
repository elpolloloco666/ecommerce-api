const Joi = require('joi');

const id = Joi.number().integer();
const first_name = Joi.string().alphanum().min(3).max(32);
const last_name = Joi.string().alphanum().min(3).max(32);
const email = Joi.string().email().max(50);
const password = Joi.string().min(6);
const role = Joi.string().max(10);


const createCustomerSchema = Joi.object({
  first_name : first_name.required(),
  last_name: last_name.required(),
  email: email.required(),
  password: password.required(),
  role: role
});

const updateCustomerSchema = Joi.object({
  first_name : first_name,
  last_name: last_name,
  email: email,
  password: password,
  role: role
});

const getCustomerSchema = Joi.object({
  id: id.required()
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
