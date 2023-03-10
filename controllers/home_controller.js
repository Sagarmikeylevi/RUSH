const { populate } = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req , res){

    try {
        // populate the whole user object
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
           path: 'comments',
           populate:{
             path: 'user'
           }
        });

        let users = await User.find({}); 
        
        return res.render('home' , {
            title: "RUSH | Home",
            posts: posts,
            all_users: users
        });
        
    } catch (err) {
        console.log(`Error in home controller: ${err}`);
        return;
    }
    

    
}