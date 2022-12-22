const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users_controller');

router.get('/profile' , UserController.profile);
router.get('/sign-in' , UserController.signIn);
router.get('/sign-up' , UserController.signUp);

router.post('/create' , UserController.create);
router.post('/create-session' , UserController.createSession);
router.post('/delete-session' , UserController.deleteSession);


module.exports = router;