var express = require("express");
var api = express.Router();
var ServiceCTRL = require('./controllers/service-controller');
var UserCTRL = require('./controllers/user-controller');

api.post('/saveService', ServiceCTRL.saveService);
api.get('/getServices', ServiceCTRL.getServices);
api.get('/getServiceNameId/:name', ServiceCTRL.getServiceNameId);

// user queries
api.post('/login', UserCTRL.login);
api.get('/getServicesByUser/:id', UserCTRL.getServicesByUser);
api.get('/getToursByUser/:id', UserCTRL.getToursByUser);

module.exports = api;