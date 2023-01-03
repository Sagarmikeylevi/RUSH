const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController = require('../controllers/users_controller');

router.get('/profile/:id' , passport.checkAuthentication ,UserController.profile);
router.post('/update/:id' , passport.checkAuthentication ,UserController.update);
router.get('/sign-in' , UserController.signIn);
router.get('/sign-up' , UserController.signUp);

router.post('/create' , UserController.create);

// use passport as a middleware to authenticate
router.post('/create-session' , passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), UserController.createSession);

router.get('/sign-out' , UserController.destroySession);

router.get('/auth/google' , passport.authenticate('google' , {scope: ['profile' , 'email']}));

router.get('/auth/google/callback' , passport.authenticate('google' , {failureRedirect: 'users/sign-in'}) , UserController.createSession);

module.exports = router;