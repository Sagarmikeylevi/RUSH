const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes');

module.exports.create = async function (req, res) {
    try {

        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Created!"
                });
            }
            req.flash('success' , 'Commented Succesfully');
            return res.redirect('/');
        }

    } catch (err) {
        console.log(`Error in creating a comment: ${err}`);
        return;
    }


}

module.exports.destroy = async function (req, res) {

    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment Deleted"
                });
            }
            
            req.flash('success' , 'Comment Deleted');
            return res.redirect('back');

        } else {
            
            return res.redirect('back');
        }
    } catch (error) {
        console.log(`Error in deleting a comment: ${err}`);
        return;
    }
}