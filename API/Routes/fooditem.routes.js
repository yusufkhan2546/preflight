const express = require('express');
const router = express.Router();
const FoodItemController = require('../Controllers/fooditem.controller');
const setDynamicValues = require('../Middlewares/setdynamicdetails');

//route paths to controllers
router.post('/newitem',setDynamicValues,FoodItemController.additem);
router.get('/getallfooditems/:restaurentId',FoodItemController.getAllItems);
router.get('/:fooditemId',FoodItemController.getitembyId);
router.patch('/:fooditemId',FoodItemController.editItem);
router.delete('/:fooditemId',FoodItemController.deleteItem);





//exporting modules
module.exports = router;