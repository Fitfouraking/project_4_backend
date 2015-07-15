var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/turingdb');
var Address = require('../models/address.js');
var Listing = require('../models/listing.js');
var User = require('../models/user.js');

var removeSeed = function(done) {
  User.remove({}, done);
};


var createSeed = function(done) {
  User.create({
    firstName: 'Bill',
    lastName: 'Murray',
    email: 'bill@yahoo.com',
    username: 'bill',
    password: 'bill',
    listing: [{

    address: [{
      street: '123 A Street',
      secondStreet: '',
      city: 'Boston',
      state: 'MA',
      zipCode: 02212,
      country: 'USA'
    }],
    startDate: '2015-09-01',
    price: 1500,
    description: '1 bedroom in 3br apt in Southie, includes roofdeck!'
    }]
  }, done);
};

async.series([
  removeSeed,
  createSeed
], function(err) {
  if (err) {
    console.log(err);
  }
  mongoose.disconnect();
});
