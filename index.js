const express = require('express');
const app = express();
const routerApi = require('./routes/index');
const { logError, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler');
const {checkApiKey} = require('./middlewares/authHandler');
const passport = require('passport');

app.use(express.json());


require('./utils/auth');


routerApi(app);

//Error middlewares
app.use(logError);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('listening port 3000');
})
