const express = require('express');
const router = express.Router();
const CartItemController = require('../Controllers/cartitem.controller');

router.post('/newcartitem',CartItemController.additem);
router.post('/deletemany',CartItemController.deletemany);
router.get('/getallcartItems/:userId',CartItemController.getAllItems);
router.get('/:cartitemId',CartItemController.getitembyId);
router.patch('/:cartitemId',CartItemController.editItem);
router.delete('/:cartitemId',CartItemController.deleteItem);

//exporting modules
module.exports = router;