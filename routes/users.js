var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();
var User = require('./models/user.js');
var Address = require('./models/address.js');
var Listing = require('./models/listing.js');


//LISTING ROUTES

//Show all listings
router.get('/listings', function(req, res) {
  Listing.find({}, function(err, listingResults) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    res.json(listingResults);
  });
});


//Show a specific listing
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
router.post('/listing/new', jsonParser);
router.post('/listing/new', function(req, res) {
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


//Delete a listing
router.delete('/:id', function(req, res) {
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
