var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();
var User = require('../models/user.js');
var Address = require('../models/address.js');
var Listing = require('../models/listing.js');


//USER ROUTES
router.get('/all', function(req, res) {
  User.find({}, function(err, userResults) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(userResults);
  });
});


//LISTING ROUTES

//Show a listing
router.get('/:id/listing/:listing_id', function(req, res) {
  User.find({
    _id: req.params.id
  }, {
    questions: {
      $elemMatch: {
        _id: req.params.listing_id
      }
    }
  }, function(err, listing) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(listing);
  });
});


//Create a new listing
router.post('/:id/new/', jsonParser);
router.post('/:id/new/', function(req, res) {
  User.update({
    _id: req.params.id,
  }, {
    $push: {
      listing: req.body
    }
  }, function(err, listing) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    console.log(listing);
    res.sendStatus(201);
  });
});


//Edit an existing Listing
router.put('/:id/listing/:listing_id', jsonParser);
router.put('/:id/listing/:listing_id', function(req, res) {
  User.update({
    _id: req.params.id,
    'listing._id': req.params.listing_id
  }, {
    $set: {
      'listing.$': req.body
    }
  }, function(err, listing) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    console.log('updated the listing.');
    res.sendStatus(200);
  });
});



//Delete a listing
router.delete('/:id/listing/:listing_id', function(req, res) {
  User.update({
    _id: req.params.id,
  }, {
    $pull: {
      listing: {
        _id: req.params.listing_id
      }
    }
  }, function(err, listing) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    console.log('listing successfully deleted.');
    res.sendStatus(204);
  });
});



module.exports = router;
