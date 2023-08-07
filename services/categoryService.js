const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class categoryService {
  async getAllCategories() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async getOneCategory(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if (category) return category
    else throw boom.notFound('category not found');
  }

  async createCategory(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async updateCategory(id, data) {
    const category = await models.Category.findByPk(id);
    if (category) {
      const updatedCategory = await category.update(data);
      return updatedCategory;
    } else throw boom.notFound('Category not found');
  }

  async deleteCategory(id) {
    const category = await models.Category.findByPk(id);
    if (category) {
      const deletedCategory = await category.destroy();
      return id;
    } else throw boom.notFound('Category not found');
  }
}

module.exports = categoryService;
