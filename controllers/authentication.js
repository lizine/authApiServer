const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
exports.signup = function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
   return res.status(422).send({error: "please provide email and password"});
  }
//See if a user with given email exists
  User.findOne({ email : email }, function(err, existingUser){
    if (err) {
      return next(err);
    }
  //is user exists, return an Error
    if(existingUser){
      return res.status(422).send( {error: 'Email is already in use'});
    }
  //if email doesn't exist, create user..
    const user = new User({
      email : email,
      password : password
    });
    //..and save the user
    user.save(function(err){
      if (err){
        return next(err);
      }
      //respond to request.
      res.json({ token: tokenForUser(user) });
    });
  });
}
