const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController = require('../controllers/users_controller');

router.get('/profile' , passport.checkAuthentication ,UserController.profile);
router.get('/sign-in' , UserController.signIn);
router.get('/sign-up' , UserController.signUp);

router.post('/create' , UserController.create);

// use passport as a middleware to authenticate
router.post('/create-session' , passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},
), UserController.createSession);

router.get('/sign-out' , UserController.destroySession);


module.exports = router;