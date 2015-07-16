var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/housingdb');
// var Address = require('../models/address.js');
var Listing = require('../models/listing.js');
var User = require('../models/user.js');

var removeSeed = function(done) {
  console.log("removed");
  User.remove({}, done);
};


var createUser = function(done) {
  User.create({
    firstName: 'Bill',
    lastName: 'Murray',
    email: 'bill@yahoo.com',
    username: 'bill',
    password: 'bill'
   }, done);
};


var createListing = function(done) {
  Listing.create({
    admin: 'bill',
    address: [{
        street: '123 A Street',
        secondStreet: '',
        city: 'Boston',
        state: 'MA',
        zipCode: 02212
    }],
    startDate: '2015-09-01',
    price: 1500,
    description: '1 bedroom in 3br apt in Southie, includes roofdeck!'
  }, done);
};

async.series([
  removeSeed,
  createUser,
  createListing
], function(err) {
  if (err) {
    console.log(err);
  }
  mongoose.disconnect();
});
