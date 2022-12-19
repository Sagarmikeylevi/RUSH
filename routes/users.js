const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users_controller');

router.get('/profile' , UserController.profile);


module.exports = router;