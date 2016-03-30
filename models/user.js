const mongoose = require('mongoose');
const Schema = mongoose.Schema; //tell mongoose to our fields in our model

//Define  model
const userSchema = new Schema({
  email: { type: String, unique : true, lowercase : true}, // mongoose, make sure that the email is string, unique and save it lowercase
  password: String
});

//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;
