const express = require('express');
const app = express();
const cors = require('cors');
const routerApi = require('./routes/index');
const { logError, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler');


app.use(express.json());

const whiteList = ["https://ecommerce-app-mu-seven.vercel.app/","http://localhost:3000"];
const options = {
  origin: (origin,callback) => {
    if(whiteList.includes(origin)){
      callback(null,true);
    }else {
      callback(new Error('You are not allowed to use this API :p'));
    }
  }
}

app.use(cors(options));

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
