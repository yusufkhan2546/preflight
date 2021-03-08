const express = require('express');
const router = express.Router();
const LocationController = require('../Controllers/location.controller');
//route paths to controllers
router.get('/track/:latitude&:longitude',LocationController.getLocationData);
router.get('/isServiceable/:longitude&:latitude',LocationController.isServiceableArea);
//exporting modules
module.exports = router;