const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//middlware / helper. params: use jwt strategy, session false, we don't want passport to generate coociebased session, we are usin jwts
const requireAuth = passport.authenticate('jwt', {session :false});
const requireSignin = passport.authenticate('local', {session:false});

module.exports = function(app){
  //any request to / has to go through requireAuth, then callback.
  app.get('/', requireAuth, function(req,res){
    res.send({hi : 'there'});
  });
  //any request to /signin has to go through requireSignin middleware before signin 
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
