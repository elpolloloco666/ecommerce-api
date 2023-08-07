const express = require('express');
const router = express.Router();
const passport = require('passport');
const validatorHandler = require('../middlewares/validatorHandler');
const {createOrderSchema,updateOrderSchema,getOrderSchema} = require('../schemas/orderSchema');
const { createProductItemSchema } = require('../schemas/productOrderSchema');
const { checkRoles } = require('../middlewares/authHandler');
const orderService = require('../services/orderService');

const service =  new orderService();


//Get all orders
router.get('/',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
async(req,res,next)=>{
  try {
    const orders = await service.getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error)
  }
});

//Get order with id
router.get('/:id',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
validatorHandler(getOrderSchema,'params'),
async(req,res,next)=>{
  try {
    const {id} = req.params;
    const order= await service.getOneOrder(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

//Create order
router.post('/',
passport.authenticate('jwt',{session:false}),
validatorHandler(createOrderSchema,'body'),
async(req,res,next)=>{
  try {
    const data = req.body;
    const userId = req.user.sub;
    const newOrder = await service.createOrder(userId,data);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

//Update order
router.patch('/:id',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
validatorHandler(getOrderSchema,'params'),
validatorHandler(updateOrderSchema,'body'),
async(req,res,next)=>{
  try {
    const {id} = req.params;
    const data = req.body;
    const updatedOrder = await service.updateOrder(id,data);
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

//Delete order
router.delete('/:id',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
validatorHandler(getOrderSchema,'params'),
async(req,res,next)=>{
  try {
    const {id} = req.params;
    const deletedOrder = await service.deleteOrder(id);
    res.status(201).json(deletedOrder);
  } catch (error) {
    next(error);
  }
});

// Add product Item to order
router.post('/add-item',
passport.authenticate('jwt',{session:false}),
validatorHandler(createProductItemSchema,'body'),
async (req,res,next) =>{
  try {
    const data = req.body;
    const newItem = await service.createItem(data);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
}
)

module.exports = router;
