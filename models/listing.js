var mongoose = require('mongoose');
var addressSchema = require('./address.js');

var listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: [addressSchema.schema
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


var Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
