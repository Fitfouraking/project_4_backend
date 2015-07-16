var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


// Passport-local will add username, hash and salt field to store username, the hashed password and the salt value
var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('user', userSchema);
module.exports = User;
