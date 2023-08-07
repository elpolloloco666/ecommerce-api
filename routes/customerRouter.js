const validatorHandler = require('../middlewares/validatorHandler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customerSchema');
const customerService = require('../services/customerService');
const passport = require('passport');
const { checkRoles } = require('../middlewares/authHandler');
const express = require('express');
const router = express.Router();

const service = new customerService();


//Get all customers
router.get('/',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
async(req,res,next) => {
 try {
  const data = await service.getAllCustomers();
  res.json(data);
 } catch (error) {
    next(error);
 }
});

//Get customer with id
router.get('/customer-data',
passport.authenticate('jwt',{session:false}),
async(req,res,next) => {
 try {
  const id = req.user.sub;
  const data = await service.getOneCustomer(id);
  res.json(data);
 } catch (error) {
  next(error);
 }
});

//Create customer
router.post('/',
validatorHandler(createCustomerSchema,'body'),
async(req,res,next) => {
 try {
  const customerData = req.body;
  const newCustomer = await service.createCustomer(customerData);
  res.status(201).json(newCustomer);
 } catch (error) {
    next(error);
 }
});

//Update customer
router.patch('/:id',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
validatorHandler(getCustomerSchema,'params'),
validatorHandler(updateCustomerSchema,'body'),
async(req,res,next) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const updatedCustomer = await service.updateCustomer(id,body);
    res.json(updatedCustomer);
  } catch (error) {
    next(error);
  }
});

//Delete customer
router.delete('/:id',
passport.authenticate('jwt',{session:false}),
checkRoles(['admin']),
validatorHandler(getCustomerSchema,'params'),
async(req,res,next) => {
  try {
    const {id} = req.params;
    const deletedCustomer = service.deleteCustomer(id);
    res.status(201).json(deletedCustomer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
