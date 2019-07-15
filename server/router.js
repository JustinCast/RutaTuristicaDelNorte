var express = require("express");
var api = express.Router();
var ServiceCTRL = require('./controllers/service-controller');

api.post('/saveService', ServiceCTRL.saveService);
api.get('/getServices', ServiceCTRL.getServices);

module.exports = api;