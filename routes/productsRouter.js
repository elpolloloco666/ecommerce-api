const express = require('express');
const router = express.Router();
const passport = require('passport');
const { checkRoles } = require('../middlewares/authHandler');
const validatorHandler = require('../middlewares/validatorHandler');
const { createProductSchema,updateProductSchema,getProductSchema,queryProductSchema } = require('../schemas/productSchema');
const productService = require('../services/productService');

const service = new productService();

//Get all products
router.get('/',
validatorHandler(queryProductSchema,'query'),
async (req,res,next) =>{
  try {
    const products = await service.getAllProducts(req.query);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

//Get featured products
router.get('/featured', async(req,res,next) => {
  try {
    const products = await service.getFeaturedProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});


//Get a product with id
router.get('/:id',
validatorHandler(getProductSchema,'params'),
async(req,res,next) => {
  try {
    const {id} = req.params;
    const product = await service.getOneProduct(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

//Create new product
router.post('/',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
validatorHandler(createProductSchema,'body'),
async(req,res,next) => {
  try {
    const data = req.body;
    const newProduct = await service.createProduct(data);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

//update product
router.patch('/:id',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'),
async(req,res,next) => {
  try {
    const {id} = req.params;
    const data = req.body;
    const updatedProduct = await service.updateProduct(id,data);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

//delete product
router.delete('/:id',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
validatorHandler(getProductSchema,'params'),
async(req,res,next) => {
  try {
    const {id} = req.params;
    const deletedProduct = await service.deleteProduct(id);
    res.status(201).json(deletedProduct);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
