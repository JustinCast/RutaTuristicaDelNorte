var express = require("express");
var api = express.Router();
var ServiceCTRL = require('./controllers/service-controller');
var UserCTRL = require('./controllers/user-controller');

api.post('/saveService', ServiceCTRL.saveService);
api.get('/getServices', ServiceCTRL.getServices);

// user queries
api.post('/login', UserCTRL.login);

module.exports = api;