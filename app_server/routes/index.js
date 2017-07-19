var express = require('express');
var router = express.Router(); 

var homeCtrl = require('../controllers/home.controller');
var locationInfoCtrl = require('../controllers/location-info.cotroller');

var othersCtrl = require('../controllers/orthers');

router.get("/",othersCtrl.angularApp);
router.get('/locations', homeCtrl.homeList);
router.get("/location/:locationId",locationInfoCtrl.locationInfo);
router.get('/location/:locationId/reviews/new',locationInfoCtrl.addReview);
router.post('/location/:locationId/reviews/new',locationInfoCtrl.doAddReview);

module.exports = router;
