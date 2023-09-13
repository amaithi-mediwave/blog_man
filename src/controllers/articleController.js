const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
// const mongoose = require('mongoose');
const validator = require("../validators/articleValidator");

const { messages } = require("../utils/responseMessages");

articleService = require("../services/articleServices");

// const { articleModel,
//   articleCommentsModel,
//   articleCategoryModel} = require("../models/articleModel");




//@ Desc Get All Articles
//@route GET /api/articles
//@ access Public

const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await articleService.findArticles();
  res.status(200).json(articles);
});

//---------------------------------------------------------------

//@ Desc Get User-All Articles
//@route GET /api/articles/user
//@ access Private

const getUserArticles = asyncHandler(async (req, res) => {
  // const user_articles = await articleModel.find({ user_id: req.user.id }, {user_id:0, __v: 0})
  // .populate([{path: 'article_category_id', model: 'articleCategory', select: 'category_name -_id' }]);

  const userArticles = await articleService.findUserArticles(req.user.id);

  res.status(200).json(userArticles);
});

//---------------------------------------------------------------

//@ Desc Get a Single - User Article
//@route GET /api/articles/user/id

const getUserArticle = asyncHandler(async (req, res) => {

    // const user_article = await articleModel.findById(req.params.id, {user_id:0, __v: 0})
    // .populate([{path: 'article_category_id', model: 'articleCategory', select: 'category_name -_id' }]);
    
    const userArticle = await articleService.findUserOneArticle(req.params.id);    

  if (!userArticle) { res.status(404); throw new Error(messages.article.mes_1);}

    res.status(200).json({userArticle});
  });

//---------------------------------------------------------------


//@ Desc Create New Article
//@route POST /api/articles
//@ access Private

const createArticle = asyncHandler(async (req, res) => {
  const { title, summary, blog_data, article_category, visibility } = req.body;

  
  const { error } = validator.validateArticle(title, summary, blog_data, article_category, visibility);
  if (error) { res.status(403); throw new Error(`${error}`);};

  let cate_name = article_category.toLowerCase();
  // const categoryAvailable = await articleCategoryModel.findOne({ category_name: cate_name });
  const categoryAvailable = await articleService.findCategory(cate_name);

  if(!categoryAvailable) {res.status(403); throw new Error(`${article_category} - ${messages.article.mes_2}`);}
  
  const cate_id = categoryAvailable._id 

// let pub = null;         // var variable = (condition) ? (true block) : (else block)

var pub = (!visibility === true) ? null : Date.now();

// const article = await articleModel.create({
//   user_id: req.user.id,
//   title,
//   summary,
//   blog_data,
//   // article_category,
//   article_category_id: cate_id,
//   visibility,
//   published_at: pub
//    }); 

const newArticle = await articleService.createArticle(req.user.id, title, summary, blog_data, cate_id, visibility, pub);
console.log(newArticle);
if (newArticle) {
  res.status(201).json({ message: `${newArticle.title} - ${messages.article.mes_4}` });
}
else {
  res.status(400); throw new Error(messages.article.mes_3);
}
  
  
});

//---------------------------------------------------------------


//@ Desc Update an Article
//@route PUT /api/articles/user/id
//@ access Private

const updateArticle = asyncHandler(async (req, res) => {
    const { title, summary, blog_data, article_category, visibility } = req.body;

    const { error } = validator.validateArticle(title, summary, blog_data, article_category, visibility);
  if (error) {res.status(403); throw new Error(`${error}`);}

  const article = await articleService.findOneArticle(req.params.id); 

  if (!article) {res.status(404); throw new Error(messages.article.mes_1); }

  if (article.user_id.toString() !== req.user.id.toString()) { res.status(403); throw new Error(messages.article.mes_5);}

  var pub = (!visibility == "true") ? null : Date.now();

let cate_name = article_category.toLowerCase();


  const categoryAvailable = await articleService.findCategory(cate_name);

  if(!categoryAvailable) {res.status(403); throw new Error(`${article_category} - ${messages.article.mes_2}`);}
  
  const cate_id = categoryAvailable._id 

  const updatedArticle = await articleService.updateOneArticle(req.params.id, title, summary, blog_data, cate_id, visibility, pub);

  if (updatedArticle) {res.status(200).json({message: messages.article.mes_6, Updated_Article: updatedArticle});}

  else {res.status(400); throw new Error(messages.article.mes_7);}

  // const updatedArticle = await articleModel.findByIdAndUpdate(
  //   {_id:req.params.id},
  //   {title,
  //     summary,
  //     blog_data,
  //     article_category_id: cate_id,
  //     visibility,
  //     published_at: pub},
  //   { new: true }).populate([{path: 'article_category_id', model: 'articleCategory', select: 'category_name -_id' }]);

  
});


//---------------------------------------------------------------


//@ Desc Delete an Article
//@route DELETE /api/articles/user/id
//@ access Private

const deleteArticle = asyncHandler(async (req, res) => {
    
  const article = await articleService.findOneArticle(req.params.id); 

  if (!article) {res.status(404); throw new Error(messages.article.mes_1); }

  if (article.user_id.toString() !== req.user.id.toString()) { res.status(403); throw new Error(messages.article.mes_5);}

  
  
  
  
  // const article = await articleModel.findById({_id: req.params.id});
    
  //   if (!article) {
  //     res.status(404);
  //     throw new Error("article Not Found");
  //   }
  //   if(article.user_id.toString() !== req.user.id) {
  //     res.status(403);
  //     throw new Error("User don't have the permission to delete other user contacts");
  //   };
  const deletedArticle = await articleService.deleteOneArticle(req.params.id);
  // await articleModel.findByIdAndDelete(req.params.id);

  if(deletedArticle) {
    res.status(200).json({message: messages.article.mes_8, Article: {
      title: deletedArticle.title, 
      summary: deletedArticle.summary,
      blog_data: deletedArticle.summary,
      article_category: deletedArticle.article_category,
      visibility: deletedArticle.visibility
  }});
  } else {
    res.status(400); throw new Error(messages.article.mes_9);
  }
    
  });


//------------------------------------------------------
//                CATEGORY CONTROLLER
//------------------------------------------------------



//@ Desc Get All Categories
//@route GET /api/articles/category
//@ access Public

const getAllArticleCategories = asyncHandler(async (req, res) => {

  const categories = await articleService.findAllCategories();

  // const categories = await articleCategoryModel.find(
    // {},
    // { _id:0, __v: 0, created_at: 0, updated_at: 0 }
  // ); //exclude fields by using the second parameter of the find method
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(400); throw new Error(messages.article.mes_10);
  }
  
  
  
});



//---------------------------------------------------------------

//@desc Create Article Category
//@route POST /api/articles/category
//@access private

const createUpdateArticleCategory = asyncHandler(async (req, res) => {
  const {
    category_name,
    category_desc,
    update_category,
    updated_category_name,
    updated_category_desc,
  } = req.body;

  const { error } = validator.validateArticleCategory(category_name, category_desc, update_category, updated_category_name, updated_category_desc);
  if (error) {res.status(403); throw new Error(`${error}`);}

  let cate_name = category_name.toLowerCase();
  let update_cate_name = updated_category_name.toLowerCase();

  // const categoryAvailable = await articleCategoryModel.findOne({ category_name: cate_name });
  // const updateCategoryAvailable = await articleCategoryModel.findOne({ category_name: update_cate_name });

  const categoryAvailable = await articleService.findCategory(cate_name);
  const updateCategoryAvailable = await articleService.findCategory(update_cate_name);

  if(!categoryAvailable){res.status(400); throw new Error(`${category_name}' - ${messages.article.mes_13}`); }

  if (categoryAvailable === null && update_category === "false") {

    // creating new category to the DB
    // const category = await articleCategoryModel.create({
    //     category_name: cate_name,
    //   category_desc,
    // });
    category = await articleService.createCategory(cate_name, category_desc);
    // console.log(`Category Created ${category.category_name}`);

    if (category) {
      res.status(201).json({
        New_category: {
          category_name: category.category_name,
          category_desc: category.category_desc,
        },
      });
    }
  } else if (update_category === "true") {
    // console.log(categoryAvailable)

    

    if(updateCategoryAvailable){
      res.status(400);
    throw new Error(`${updated_category_name}' - ${messages.article.mes_11}`); }

    // if (!update_category === true || !updated_category_name || !updated_category_desc) {
    //   res.status(400);
    //   throw new Error("All category update parameters are mandatory for updating the category");
    // }
    // const updatedCategory = await articleCategoryModel.findOneAndUpdate(
    //   { category_name: cate_name },
    //   { category_name: update_cate_name, category_desc: updated_category_desc },
    //   {
    //     new: true, // for retriving the newly updated document from the DB
    //   }
    // );

    const updatedCategory = await articleService.updateCategory(cate_name, update_cate_name, updated_category_desc);

      if (!updatedCategory){res.status(400);  throw new Error(`${category_name} ${messages.article.mes_12}`);
      }
    // console.log(`Updated Category ${updatedCategory.category_name}`);
    // console.log(updatedCategory)
    res.status(200).json({
      updated_category: {
        category_name: updatedCategory.category_name,
        category_desc: updatedCategory.category_desc,
      },
    });}

    // else if (categoryAvailable === null ) {
    //     res.status(404);
    // throw new Error(`Category ${category_name} is Not Exists and Can't Update the Category`);
    // }

  // else {
  //   res.status(400);
  //   throw new Error(`Category ${category_name} Already Exists and update_category parameter is not properly given, make sure you gave it properly`);
  // }
});

//---------------------------------------------------------------



//@desc current user info
//@route GET /api/users/current
//@access private

// const currentUserInfo = asyncHandler(async (req, res) => {
//   const user_info = await User_info.findOne({ user_id: req.user.id });

//   if (!user_info) {
//     res
//       .status(204)
//       .json({ message: "User Info Doesn't Exists Create a New Info" });
//   } else {
//     res.status(200).json({
//       user_info: {
//         name: `${user_info.first_name} ${user_info.lastname}`,
//         dob: user_info.dob,
//         profession: user_info.profession,
//         interests: user_info.interests,
//         about: user_info.about,
//       },
//     });
//   }
// });

//---------------------------------------------------------------


//------------------------------------------------------
//                COMMENTS CONTROLLER
//------------------------------------------------------



//@ Desc Get All comments of an Article
//@route GET /api/articles/comments/:id
//@ access Public

const getComments = asyncHandler(async (req, res) => {
  // const comments = await Article_Comments.find({article_id: req.params.id},
  //   { _id:0, __v: 0, created_at: 0, updated_at: 0 }).populate('user_id', {'username':1, _id :0}); //exclude fields by using the second parameter of the find method

    // const comments = await articleCommentsModel.find({article_id: req.params.id},
    //   { __v: 0, created_at: 0, updatedAt: 0 }).populate([{path: 'user_id', model: 'user', select: 'username -_id' },
    //                                                             {path: 'article_id', model: 'article', select: 'title -_id'}]
    //   ); //exclude fields by using the second parameter of the find method
  const comments = await articleService.findComments(req.params.id);

  res.status(200).json(comments);
});


//---------------------------------------------------------------



//@ Desc Create New Comment
//@route POST /api/articles/comments/:id
//@ access Private

const createComment = asyncHandler(async (req, res) => {
    const { comment } = req.body;
  
    if (!comment) {res.status(400); throw new Error(messages.comment.mes_1);}
  
    // const new_comment = await articleCommentsModel.create({
    //     user_id: req.user.id,
    //     article_id: req.params.id,
    //     comment_data: comment,
    //   });

    const newComment = await articleService.createComment(req.user.id, req.params.id, comment)
      
    if(!newComment) {res.status(400);  throw new Error(messages.comment.mes_2);}

    else{
      // console.log(new_comment);
    res.status(201).json({ message: messages.comment.mes_3});
  }});
  
//---------------------------------------------------------------



//@ Desc Update an Existing Comment
//@route PUT /api/articles/comments/id
//@ access Private

const updateComment = asyncHandler(async (req, res) => {
    const { comment_data } = req.body;
    if (!comment_data) {res.status(400); throw new Error(messages.comment.mes_1);}

  // const comment = await articleCommentsModel.findById({_id: req.params.id});
  const comment = await articleService.findComment(req.params.id);
  
  if (!comment) {res.status(404); throw new Error(messages.comment.mes_4);}
  
  if (comment.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(messages.comment.mes_5);}


  // const updatedcomment = await articleCommentsModel.findByIdAndUpdate(
  //   {_id:req.params.id},
  //   {comment_data: comment_data},
  //   { new: true });
  //   console.log(updatedcomment)

  const updatedComment = await articleService.updateComment(req.params.id, comment_data);
    if(!updatedComment) {res.status(400);  throw new Error(messages.comment.mes_6);}
    else {
  res.status(200).json({
    message: messages.comment.mes_7, data: {
    old_comment: comment.comment_data,
    updated_comment: updatedComment.comment_data}
  });}
});

//---------------------------------------------------------------


//@ Desc Delete Comment
//@route DELETE /api/articles/comments/id
//@ access Private

const deleteComment = asyncHandler(async (req, res) => {

  
  const comment = await articleService.findComment(req.params.id);
  
  if (!comment) {res.status(404); throw new Error(messages.comment.mes_4);}
  
  if (comment.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(messages.comment.mes_10);}

  // const comment = await articleCommentsModel.findById(req.params.id);
  // console.log(comment);
  // if (!comment) {
  //   res.status(404);
  //   throw new Error("Comment Not Found");
  // }
  // if(comment.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User don't have the permission to delete other users Comment");
  // };
// await articleCommentsModel.findByIdAndDelete(req.params.id);
const delComment = await articleService.deleteComment(req.params.id);
if(!delComment) {res.status(400);  throw new Error(messages.comment.mes_8);}
    else {
      res.status(200).json({message: messages.comment.mes_9, Deleted_comment: delComment.comment_data});}


 
});

//--------------------------------------------------------------






// Exporting Modules
module.exports = {
  getAllArticles,
  getUserArticle,
  getUserArticles,
  createArticle,
  updateArticle,
  deleteArticle,

  createUpdateArticleCategory, 
  getAllArticleCategories,

  createComment,
  getComments,
  updateComment,
  deleteComment,

};




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
