const asyncHandler = require("express-async-handler");
const Article_Comments = require("../models/articleCommentsModel");


// ------------------ REFERENCE POPULATE

// Project.find(query)
//     .populate({ 
//       path: 'pages',
//       populate: [{
//        path: 'components',
//        model: 'Component'
//       },{
//         path: 'AnotherRef',
//         model: 'AnotherRef',
//         select: 'firstname lastname'
//       }] 
//    })
//    .exec(function(err, docs) {});


//---------------------------------------------------




//@ Desc Get All comments of an Article
//@route GET /api/articles/comments/:id
//@ access Public

const getComments = asyncHandler(async (req, res) => {
  // const comments = await Article_Comments.find({article_id: req.params.id},
  //   { _id:0, __v: 0, created_at: 0, updated_at: 0 }).populate('user_id', {'username':1, _id :0}); //exclude fields by using the second parameter of the find method

    const comments = await Article_Comments.find({article_id: req.params.id},
      { __v: 0, created_at: 0, updatedAt: 0 }).populate([{path: 'user_id', model: 'User', select: 'username -_id' },
                                                                {path: 'article_id', model: 'Article', select: 'title -_id'}]
      ); //exclude fields by using the second parameter of the find method
  

  res.status(200).json(comments);
});


//@ Desc Create New Comment
//@route POST /api/articles/comments/:id
//@ access Private

const createComment = asyncHandler(async (req, res) => {
    const { comment } = req.body;
  
    if (!comment) {
      res.status(400);
      throw new Error("Enter your Comment");
    }
  
    const new_comment = await Article_Comments.create({
        user_id: req.user.id,
        article_id: req.params.id,
        comment_data: comment,
      });
      
      console.log(new_comment);
    res.status(201).json({ message: `Your Comment is created and published`});
  });
  



//@ Desc Update an Existing Comment
//@route PUT /api/articles/comments/id
//@ access Private

const updateComment = asyncHandler(async (req, res) => {
    const { comment_data } = req.body;

  const comment = await Article_Comments.findById({_id: req.params.id});
  
  if (!comment) {
    res.status(404);
    throw new Error("Comment Not Exists");
  }
  if (comment.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "You don't have permission to update the Comment posted by another User"
    );
  }

  const updatedcomment = await Article_Comments.findByIdAndUpdate(
    {_id:req.params.id},
    {comment_data: comment_data},
    { new: true });
    console.log(updatedcomment)

  res.status(200).json({
    message: "Comment has been updated",data: {
    old_comment: comment.comment_data,
    updated_comment: updatedcomment.comment_data}
  });
});



//@ Desc Delete Comment
//@route DELETE /api/articles/comments/id
//@ access Private

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Article_Comments.findById(req.params.id);
  console.log(comment);
  if (!comment) {
    res.status(404);
    throw new Error("Comment Not Found");
  }
  if(comment.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have the permission to delete other users Comment");
  };
await Article_Comments.findByIdAndDelete(req.params.id);
  res.status(200).json({message: "Comment Deleted", Deleted_comment: comment.comment_data});
});



module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment,
}