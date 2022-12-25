const Post = require('../models/post');

module.exports.home = function(req , res){
    // populate the whole user object
    Post.find({}).populate('user').exec(function(err , posts){
        return res.render('home' , {
            title: "RUSH | Home",
            posts: posts
        });
    });
}