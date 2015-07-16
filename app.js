require('dotenv').load();
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var cors = require('cors');
var passport = require('passport');
var express_session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/housingdb');

var config = require('./config');

//CREATE AN INSTANCE OF AN EXPRESS APP
var app = express();
// mongoose.connect(config.mongo.dbUrl)

//CORS SHIT
var corsOptions = {
 methods: ['GET', 'PUT', 'POST'],
 origin: 'http://localhost:5000',
 credentials: true
};

app.use(cors(corsOptions));


//SCHEMA
// var Address = require('./models/address.js');
var Listing = require('./models/listing.js');
var User = require('./models/user.js');


var initPassport = require('./passport/init');
initPassport(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(cors({origin:'http://localhost:5000', credentials: true}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('fitfouraking'));
app.use(express_session({secret: 'fitfouraking', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
var loginRoutes = require('./routes/auth.js');
app.use('/auth', loginRoutes(passport));

var apiRoutes = require('./routes/apiRoutes.js');
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
