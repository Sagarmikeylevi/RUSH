const User = require('../models/user');

module.exports.profile = function(req , res){
    User.findById(req.params.id , function(req, user){
        return res.render('user_profile' , {
            title: 'RUSH | Profile',
            profile_user: user
        });
    }); 
}

module.exports.update = function(req , res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id , req.body , function(err , user){
            req.flash('success' , 'Updated Successfully');
            return res.redirect('back');
        });
    }else{
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

