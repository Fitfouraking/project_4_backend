var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Address = require('./address.js');
var Listing = require('./listing.js');


var enumeratedStates = ['AL AK AS AZ AR CA CO CT DE DC FM FL',
  'GA GU HI ID IL IN IA KS KY LA ME MH MD MA MI MN MS MO MT',
  'NE NV NH NJ NM NY NC ND MP OH OK OR PW PA PR RI SC SD TN TX',
  'UT VT VI VA WA WV WI WY'
].join(' ').split(' ');

var addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  secondStreet: String,
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true,
    enum: {
      values: enumeratedStates
    }
  },
  zipCode: {
    type: Number,
    required: true
    // match: /^\d{5}(-\d{4})?$/
  },
  country: String
});


var listingSchema = new mongoose.Schema({
  address: [addressSchema
  ],
  startDate: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});


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
  },
  listing: [listingSchema]
});


userSchema.plugin(passportLocalMongoose);

var Address = mongoose.model('Address', addressSchema);
module.exports = Address;

var Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;

var User = mongoose.model('user', userSchema);
module.exports = User;
