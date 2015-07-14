var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


// Passport-local will add username, hash and salt field to store username, the hashed password and the salt value
var userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  username: String,
  password: String
});


userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('user', userSchema);
module.exports = User;
