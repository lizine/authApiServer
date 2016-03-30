const mongoose = require('mongoose');
const Schema = mongoose.Schema; //tell mongoose to our fields in our model
const bcrypt = require('bcrypt-nodejs');
//Define  model
const userSchema = new Schema({
  email: { type: String, unique : true, lowercase : true}, // mongoose, make sure that the email is string, unique and save it lowercase
  password: String
});

//on save hook, encrypt password
//before saving a model, run this function
userSchema.pre('save', function(next){
  const user = this; //get access to user model

//generate a salt, then run callback
  bcrypt.genSalt(10, function(err,salt){
    if (err){return next(err);}
// hash the password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) {return next(err);}

//overwrite plain text pword with encrypted pword
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  //this.password this usermodels password, compare it to candidate
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) { return callback(err);}

    callback(null, isMatch);
  });
}
//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;
