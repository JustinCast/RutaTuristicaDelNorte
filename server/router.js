var express = require("express");
var api = express.Router();
var ServiceCTRL = require('./controllers/service-controller');
var UserCTRL = require('./controllers/user-controller');
var TourCTRL = require('./controllers/tour-controller');

// service queries
api.post('/saveService', ServiceCTRL.saveService);
api.get('/getServices', ServiceCTRL.getServices);
api.get('/getService/:id_service', ServiceCTRL.getService);
api.get('/getServiceNameId/:name', ServiceCTRL.getServiceNameId);

// tour queries
api.post('/saveTour', TourCTRL.saveTour);
api.get('/getRelatedTours/:related_service', TourCTRL.getRelatedTours);

// user queries
api.post('/login', UserCTRL.login);
api.get('/getServicesByUser/:id', UserCTRL.getServicesByUser);
api.get('/getToursByUser/:id', UserCTRL.getToursByUser);

module.exports = api;