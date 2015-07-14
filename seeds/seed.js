var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/turingdb');
var Address = require('../models/address.js');
var Listing = require('../models/listing.js');

var removeListings = function(done) {
  Listing.remove({}, done);
};


var createListing = function(done) {
  Survey.create({
    name: 'Bill Murray',
    address: [{
      street: '123 A Street',
      secondStreet: '',
      city: 'Boston',
      state: 'MA',
      zipcode: 02212,
      country: 'USA'
    }],
    startDate: '2015-09-01',
    price: 1500,
    description: '1 bedroom in 3br apt in Southie, includes roofdeck!'
  }, done);
};

async.series([
  removeListings,
  createListing
], function(err) {
  if (err) {
    console.log(err);
  }
  mongoose.disconnect();
});
