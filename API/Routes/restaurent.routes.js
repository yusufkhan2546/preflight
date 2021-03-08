const express = require('express');
const router = express.Router();
const RestaurentController = require('../Controllers/restaurent.controller');
const LocationController = require('../Controllers/location.controller');
const isServiceable = require('../Middlewares/isServiceable');
const serdynamics = require('../Middlewares/setdynamicdetails');

//route paths to controllers
router.patch('/:restaurentId',RestaurentController.update_restaurentbyId);
router.post('/login',RestaurentController.restaurent_login);
router.post('/signup',RestaurentController.restaurent_signUp);
router.post('/setonline',RestaurentController.setOnline);
router.post('/setweather',RestaurentController.setWeather);
 // router.get('/getallrestaurents/:longitude&:latitude',RestaurentController.get_allrestaurents);
 router.get('/getallrestaurents/:longitude&:latitude',isServiceable,RestaurentController.get_allrestaurents);
router.get('/:restaurentId',RestaurentController.get_restaurentbyId);
router.get('/watch/:restaurentId',serdynamics);
router.delete('/:restaurentId',RestaurentController.restaurent_delete);





//exporting modules
module.exports = router;