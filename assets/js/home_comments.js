{
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    ShowNoty("Commented Succesfully");
                    let newComment = newCommentDom(data.data.comment);
                    $('#post-comments-list > ul').prepend(newComment);
                    deleteComment($('.delete-comment-button' , newComment));
                }, error: function(err){
                    console.log(err.responseText);
                }
            });
        });

    }

    let newCommentDom = function(comment){
        return $(`
         <li id="comment-${comment._id}">
            <p>
                <small>
                    <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">X</a>
                </small>
                   ${ comment.content }
                <br>
                <small>
                   ${ comment.user.name }
                </small>
            </p>    
         </li>
       `)
    }

    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    ShowNoty("Comment Deleted");
                    $(`#comment-${data.data.comment_id}`).remove();
                }, error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    let ShowNoty = function(message){
        new Noty({
            theme: 'relax',
            text: message,
            type: 'success',
            layout: 'topRight',
            timeout: 1500
            
        }).show();
    }

    createComment();
}