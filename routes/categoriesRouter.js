const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/categoriesSchema');
const categoryService = require('../services/categoryService');
const validatorHandler = require('../middlewares/validatorHandler');
const { checkRoles } = require('../middlewares/authHandler');

const service = new categoryService();

//Get all categories
router.get('/',async(req,res,next)=>{
  try {
    const categories = await service.getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

//Get category with id
router.get('/:id',
validatorHandler(getCategorySchema,'params'),
async(req,res,next)=>{
  try {
    const {id} = req.params;
    const category = await service.getOneCategory(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

//Create category
router.post('/',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
validatorHandler(createCategorySchema,'body'),
async(req,res,next)=>{
  try {
    const data = req.body;
    const newCategory = await service.createCategory(data);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

//Update category
router.patch('/:id',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
validatorHandler(getCategorySchema,'params'),
validatorHandler(updateCategorySchema,'body'),
async(req,res,next)=>{
  try {
    const {id} = req.params;
    const data = req.body;
    const updatedCategory = await service.updateCategory(id,data);
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

//Delete category
router.delete('/:id',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
validatorHandler(getCategorySchema,'params'),
async(req,res,next)=>{
  try {
    const {id} = req.params;
    const deletedCategory = await service.deleteCategory(id);
    res.status(201).json(deletedCategory);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
