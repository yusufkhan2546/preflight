const express = require('express');
const router = express.Router();
const UsersController = require('../Controllers/user.controller');


router.post('/login',UsersController.user_login);
router.post('/signup',UsersController.user_signUp);

router.get('/getallUsers',UsersController.get_allUsers);

router.get('/:userId',UsersController.get_UserbyId);
router.patch('/:userId',UsersController.update_userbyId);
router.delete('/:userId',UsersController.user_delete);


module.exports = router;