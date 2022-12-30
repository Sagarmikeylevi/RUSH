const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req , res){
    User.findById(req.params.id , function(req, user){
        return res.render('user_profile' , {
            title: 'RUSH | Profile',
            profile_user: user
        });
    }); 
}

module.exports.update = async function(req , res){
    
    if(req.user.id == req.params.id){

        try {
            
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req , res , function(err){
                if(err) {console.log(`*****Multer Error: ${err}`);}

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                         fs.unlinkSync(path.join(__dirname , '..' , user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch (err) {
            console.log(`Error: ${err}`);
            return res.redirect('back');
        }
    }else{
        req.flash('error' , 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }

}

module.exports.signIn = function(req , res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_in' , {
        title: 'RUSH | Sign-In'
    });
}

module.exports.signUp = function(req , res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up' , {
        title: 'RUSH | Sign-Up'
    });
}

module.exports.create = function(req , res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email} , function(err , user){
        if(err) {console.log('error'); return;}

        if(!user){
            User.create(req.body , function(err , user){
                if(err) {console.log('error'); return;}
                
                return res.redirect('/users/sign-in');
            });
        }else{
            req.flash('success' , 'User already exits');
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function(req , res){
    req.flash('success' , 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
    });
    req.flash('success' , 'You have logged out');
    return res.redirect('/');
}

