const express = require('express');

const router = express.Router();
const userController = require('../Controllers/users.controller');


router.get('/:id',userController.getUser);
router.post('/',userController.postUser);


module.exports = router;