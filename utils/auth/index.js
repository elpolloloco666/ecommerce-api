const passport = require('passport');

const LocalStrategy = require('./strategies/localStrategy');
const jwtStrategy = require('./strategies/jwt');


passport.use(LocalStrategy);
passport.use(jwtStrategy);
