const Joi = require('joi');

const id = Joi.number().integer();
const firstName = Joi.string().alphanum().min(3).max(32);
const lastName = Joi.string().alphanum().min(3).max(32);
const email = Joi.string().email().max(50);
const password = Joi.string().min(6);
const role = Joi.string().max(10);


const createCustomerSchema = Joi.object({
  firstName : firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  role: role
});

const updateCustomerSchema = Joi.object({
  firstName : firstName,
  lastName: lastName,
  email: email,
  password: password,
  role: role
});

const getCustomerSchema = Joi.object({
  id: id.required()
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
