var express = require("express");
var api = express.Router();
var ServiceCTRL = require('./controllers/service-controller');
var UserCTRL = require('./controllers/user-controller');
var TourCTRL = require('./controllers/tour-controller');
var ImagesCTRL = require('./controllers/image-controller');

// service queries
api.post('/saveService', ServiceCTRL.saveService);
api.put('/updateService', ServiceCTRL.updateService);
api.get('/getServices', ServiceCTRL.getServices);
api.get('/getService/:id_service', ServiceCTRL.getService);
api.get('/getServiceNameId/:name/:id_user', ServiceCTRL.getServiceNameId);
api.get('/getServicesCount', ServiceCTRL.getServicesCount);
api.get('/getServiceRates/:id_service', ServiceCTRL.getServiceRates);
api.get('/getServiceNames/:id_user', ServiceCTRL.getServiceNames);
api.delete('/deleteService/:id_service', ServiceCTRL.deleteService);

// tour queries
api.post('/saveTour', TourCTRL.saveTour);
api.get('/getTours', TourCTRL.getTours);
api.get('/getTour/:id_tour', TourCTRL.getTour);
api.put('/updateTour/:id_tour', TourCTRL.updateTour)
api.get('/deleteRelatedService', TourCTRL.deleteRelatedService);
api.delete('/deleteTour/:id_tour', TourCTRL.deleteTour);
api.get('/getRelatedTours/:related_service', TourCTRL.getRelatedTours);

// images queries
api.get('/getServiceImages/:id_service', ImagesCTRL.getServiceImages);
api.get('/getTourImages/:id_tour', ImagesCTRL.getTourImages);
api.post('/deleteTourImage', ImagesCTRL.deleteTourImage);
api.post('/deleteServiceImage', ImagesCTRL.deleteServiceImage);

// user queries
api.post('/login', UserCTRL.login);
api.post('/verifyCodeUsername', UserCTRL.verifyCodeUsername);
api.get("/passwordRecovery/:username", UserCTRL.passwordRecovery);
api.get('/getServicesByUser/:id', UserCTRL.getServicesByUser);
api.get('/getToursByUser/:id', UserCTRL.getToursByUser);

module.exports = api;