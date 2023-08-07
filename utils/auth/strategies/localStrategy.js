const { Strategy } = require('passport-local');
const customerService = require('../../../services/customerService');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new customerService();


const LocalStrategy = new Strategy({usernameField:'email', passwordField:'password'},
async(email,password,done)=>{
  try {
    const user = await service.getCustomerEmail(email);
    if(!user) {
      done(boom.unauthorized(),false);
    }else{
      const isCorrect = await bcrypt.compare(password,user.password);
      if(!isCorrect) done(boom.unauthorized(),false);
      else {
        delete user.dataValues.password;
        done(null,user);
      }
    }

  } catch (error) {
    done(error,false);
  }
});

module.exports = LocalStrategy;
