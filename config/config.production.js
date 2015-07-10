var config = require('./config.global.js');

config.env = 'production';
config.hostname = 'frozen-beach-8038.herokuapp.com';
config.serverPort = process.env.PORT;

config.authCallbackUrl = 'https://frozen-beach-8038.herokuapp.com/';


config.cookieOptions = {};
config.cookieOptions.secure = true;

config.mongo = {};
config.mongo.dbUrl = process.env.DBURL;


module.exports = config;
