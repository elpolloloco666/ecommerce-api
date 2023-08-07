const boom = require('@hapi/boom');

require('dotenv').config();

const apiKey = process.env.API_KEY;

const checkApiKey = (req, res, next) =>{
  const key = req.headers['api'];
  if (key === apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

const checkRoles = (roles) =>{
  return (req,res,next) =>{
    const user = req.user;
    if(roles.includes(user.role)){
    next();
   }else {
    next(boom.unauthorized());
  }
  }
}

module.exports = { checkApiKey, checkRoles };
