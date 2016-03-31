const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy
const localOptions = { usernameField : 'email' }; //expects uname, we use email so this is needed

const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  //verify email and pword, call done if correct
  User.findOne({ email : email }, function(err, user){
    if(err) { return done(err); }
    if (!user) { return done(null,false); } //user not found

     //if user found, compare passwords and return false or if match: user.
    user.comparePassword(password, function(err, isMatch){
      if(err) { return done(err); }
      if(!isMatch){ return done(null, false);}

      return done(null,user); //passport assignes user to req.user so we can use it in authentication.js
    });
  });
});
//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest : ExtractJwt.fromHeader('authorization'), //check req header called authorization to find the token
  secretOrKey : config.secret //we have to tell the secret to use to decode the token
};

//Create JWT Strategy (this is called in router.js when user tries to get /)
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
passport.use(localLogin);
