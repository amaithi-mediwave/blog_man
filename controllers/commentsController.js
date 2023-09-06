const asyncHandler = require("express-async-handler");
const ArticleComments = requrie("../models/articleCommentsModel");


//@ Desc Create New Comment
//@route POST /api/articles/comments/:id
//@ access Private

const createComment = asyncHandler(async (req, res) => {
    const { comment_data } = req.body;
  
    if (!comment_data) {
      res.status(400);
      throw new Error("Enter your Comment");
    }
  
    const new_comment = await ArticleComments.create({
        user_id: req.user.id,
        article_id: req.params.id,
        comment_data,
      });
      
      console.log(new_comment);
    res.status(201).json({ message: `Your Comment is created and published`});
  });
  



//@ Desc Update an Existing Comment
//@route PUT /api/articles/comments/id
//@ access Private

const updateComment = asyncHandler(async (req, res) => {
    const { comment_data } = req.body;

  const comment = await ArticleComments.findById(req.params.id);
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
// console.log(comment)
  const updatedcomment = await Article.findByIdAndUpdate(
    req.params.id,
    comment_data,
    { new: true });

  res.status(200).json({
    message: "Article has been updated",
    updated: updatedArticle,
  });
});





module.exports = {
    createComment,

}