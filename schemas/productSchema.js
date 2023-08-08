const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(40);
const price = Joi.number().min(10);
const stock = Joi.number().integer().positive();
const categoryId = Joi.number().integer();
const image = Joi.string().uri();
const description = Joi.string().min(10);
const featured = Joi.boolean();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const search = Joi.string();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  stock: stock.required(),
  categoryId: categoryId.required(),
  image: image.required(),
  description: description.required(),
  featured: featured
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  stock: stock,
  categoryId: categoryId,
  image: image,
  description: description,
  featured: featured
});

const getProductSchema = Joi.object({
  id: id.required()
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  category: categoryId,
  search
});

module.exports = {createProductSchema,updateProductSchema,getProductSchema,queryProductSchema};
