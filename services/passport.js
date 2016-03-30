const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest : ExtractJwt.fromHeader('authorization'), //check req header called authorization to find the token
  secretOrKey : config.secret //we have to tell the secret to use to decode the token
};

//Create JWT Strategy

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){ //payload is decoded jwtToken, done is callback

  User.findById(payload.sub, function(err, user){
    //handle errors
    if (err) {return done(err, false); }
    if (user){
      //if user id exists, call done
      done(null, user)
    } else {
      done(null, false)
    }
  });
});
//Tell passport to use this Strategy
passport.use(jwtLogin);
