const {models} = require('../libs/sequelize');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

class productService {


  async getAllProducts(query){

    let options = {
      include:['category']
    }

    const {limit, offset, category, search} = query;

    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }

    if(category) options.where = {categoryId:category};

    if(search) options.where = {name:{[Op.like]: '%' + search + '%'}};

    const products = await models.Product.findAll(options);
    return products;
  }

  async getOneProduct(id){
    const product = await models.Product.findByPk(id);
    if(product) return product;
    else throw boom.notFound('product nout found');
  }

  async getFeaturedProducts(){
    const products = await models.Product.findAll({where:{featured:true}});
    if(products) return products;
    else throw boom.notFound('Products not found');
  }

  async createProduct(data){
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async updateProduct(id,data){
    const product = await models.Product.findByPk(id);
    if(product){
      const updatedProduct = await product.update(data);
      return updatedProduct;
    }else throw boom.notFound('product not found');
  }

  async deleteProduct(id){
    const product = await models.Product.findByPk(id);
    if(product) {
      const deletedProduct = await product.destroy();
      return id;
    }else throw boom.notFound('product not found');

  }

}

module.exports = productService;
