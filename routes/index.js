const express = require('express');

const categoriesRouter = require('./categoriesRouter');
const customerRoter = require('./customerRouter');
const orderRouter = require('./orderRouter');
const productsRouter = require('./productsRouter');
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1',router);

  router.use('/categories',categoriesRouter);
  router.use('/customers',customerRoter);
  router.use('/orders',orderRouter);
  router.use('/products',productsRouter);
  router.use('/auth',authRouter);
  router.use('/profile',profileRouter);
}

module.exports = routerApi;
