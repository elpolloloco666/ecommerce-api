const express = require('express');
const router = express.Router();
const passport = require('passport');
const orderService = require('../services/orderService');

const service = new orderService();


router.get('/customer-orders',
passport.authenticate('jwt',{session:false}),
async(req,res,next) => {
  try {
    const user = req.user;
    const orders = await service.getOrdersByCustomer(user.sub);
    res.json({orders});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
