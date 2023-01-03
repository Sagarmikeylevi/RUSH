const passport = require('passport');
const googleStategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStategy({
    clientID: "711396214468-neb70ggkk6n33usvuqni1jj77tsedk3o.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    function(accessToken , refreshToken , profile , done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err , user){
            if(err) {console.log('error in google strategy-passport' , err); return;}

            console.log(profile);

            if(user){
                // if found , set this user as req.user
                return done(null , user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err , user){
                    if(err) {console.log('error in creating google strategy-passport' , err); return;}

                    return done(null , user);
                });
            }
        });
    }

));

module.exports = passport;