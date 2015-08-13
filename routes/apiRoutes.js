var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();
var Listing = require('../models/listing.js');
var User = require('../models/user.js');


//USER ROUTES
router.get('/users/all', function(req, res) {
  User.find({}, function(err, userResults) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(userResults);
  });
});

router.get('/users/:id/listings', function(req, res) {
  var userID = req.params.id;
  Listing.find({
//    admin: userID
  }, function(err,listings){
     if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(listings);
  });
});

router.get('/user/:id', function(req, res) {
  User.find({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(user);
  });
});


//LISTING ROUTES

//Show all listings
router.get('/listings', function(req, res) {
  Listing.find({}, function(err, allListings) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(allListings);
  });
});


//Show specific listing
router.get('/listing/:id', function(req, res) {
  Listing.find({
    _id: req.params.id
  }, function(err, listing) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(listing);
  });
});



//Create a new listing
router.post('/listing', jsonParser);
router.post('/listing', function(req, res) {
  Listing.create(req.body, function(error, listing) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  });
});


//Edit an existing Listing
router.put('/listing/:id', jsonParser);
router.put('/listing/:id', function(req, res) {
  Listing.findByIdAndUpdate(req.params.id, req.body, function(error, listing) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

//Edit an address within a Listing
router.put('/listing/:id/address/:address_id', jsonParser);
router.put('/listing/:id/address/:address_id', function(req, res) {
  Listing.update({
    _id: req.params.id,
    'address._id': req.params.address_id
  }, {
    $set: {
      'address.$': req.body
    }
  }, function(err, address) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    console.log('updated address');
    res.sendStatus(200);
  });
});



//Delete a listing
router.delete('/listing/:id', function(req, res) {
  Listing.remove({
    _id: req.params.id
  }, function(error) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});



module.exports = router;
