const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");

const validator = require("../validators/articleValidator");

const { messages } = require("../utils/responseMessages");

const articleService = require("../services/articleServices");

//------------------------------------------------------
//          ARTICLE ROUTES
//------------------------------------------------------

//@ Desc Get All Articles
//@route GET /api/articles
//@ access Public

const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await articleService.findArticles();
  res.status(200).json(articles);
});

//---------------------------------------------------------------

// @Desc Get Single Article
// @route GET / api / articles /: id
// @access Public

const getSingleArticle = asyncHandler(async (req, res) => {
  const article = await articleService.findUserOneArticle(req.params.id);
  res.status(200).json(article);
});

//---------------------------------------------------------------

// @Desc Get Articles Based on Category
// @route GET / api / articles/category/: id
// @access Public


const getAllArticlesByCategory = asyncHandler(async (req, res) => {
  const articles = await articleService.findArticlesByCategory(req.params.id);
  res.status(200).json(articles);
});

//---------------------------------------------------------------


//@ Desc Get User-All Articles
//@route GET /api/articles/user
//@ access Private

const getUserArticles = asyncHandler(async (req, res) => {

  const u_id = (req.header("v2_header") === "web") ? req.params.id : req.user.id;

  const userArticles = await articleService.findUserArticles(u_id);

  res.status(200).json(userArticles);
});

//---------------------------------------------------------------

//@ Desc Get a Single - User Article
//@route GET /api/articles/user/id

const getUserArticle = asyncHandler(async (req, res) => {


  const userArticle = await articleService.findUserOneArticle(req.params.id);

  if (!userArticle) { res.status(404); throw new Error(messages.article.mes_1); }

  res.status(200).json({ userArticle });
});

//---------------------------------------------------------------


//@ Desc Create New Article
//@route POST /api/articles
//@ access Private

const createArticle = asyncHandler(async (req, res) => {
  const { user_id, title, summary, blog_data, article_category, visibility, photo } = req.body;


  const { error } = validator.validateArticle(title, summary, blog_data, article_category, visibility);
  if (error) { res.status(403); throw new Error(`${error}`); };

  let cate_id = ''
  if (req.header("v2_header") !== "web") {

    const cate_name = article_category.toLowerCase();

    const categoryAvailable = await articleService.findCategory(cate_name);

    if (!categoryAvailable) { res.status(403); throw new Error(`${article_category} - ${messages.article.mes_2}`); }

    cate_id = categoryAvailable._id
  }
  // let pub = null;         // var variable = (condition) ? (true block) : (else block)

  var pub = (!visibility === true) ? null : Date.now();

  const u_id = (req.header("v2_header") === "web") ? user_id : req.user.id;
  cate_id = (req.header("v2_header") === "web") ? article_category : cate_id;
  // let user_id = req.user.id;

  const newArticle = await articleService.createArticle(u_id, title, summary, blog_data, cate_id, visibility, pub, photo);

  if (newArticle) {
    if (req.header("v2_header") === "web") { res.status(201).json(newArticle) };
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

let cate_id = ''

  if (req.header("v2_header") !== "web") {

    const { error } = validator.validateArticle(title, summary, blog_data, article_category, visibility);
    if (error) { res.status(403); throw new Error(`${error}`); }

    const article = await articleService.findOneArticle(req.params.id);

    if (!article) { res.status(404); throw new Error(messages.article.mes_1); }

    if (article.user_id._id.toString() !== req.user.id.toString()) { res.status(403); throw new Error(messages.article.mes_5); }

    let cate_name = article_category.toLowerCase();

    const categoryAvailable = await articleService.findCategory(cate_name);

    if (!categoryAvailable) { res.status(403); throw new Error(`${article_category} - ${messages.article.mes_2}`); }
    
    cate_id = categoryAvailable._id
  }

  var pub = (!visibility == "true") ? null : Date.now();

  const c_id = (req.header("v2_header") === "web") ? article_category : cate_id;


  const updatedArticle = await articleService.updateOneArticle(req.params.id, title, summary, blog_data, c_id, visibility, pub);

  if (updatedArticle) { res.status(200).json({ message: messages.article.mes_6, Updated_Article: updatedArticle }); }

  else { res.status(400); throw new Error(messages.article.mes_7); }

});


//---------------------------------------------------------------


//@ Desc Delete an Article
//@route DELETE /api/articles/user/id
//@ access Private

const deleteArticle = asyncHandler(async (req, res) => {

  if (req.header("v2_header") !== "web") {

    const article = await articleService.findOneArticle(req.params.id);

    if (!article) { res.status(404); throw new Error(messages.article.mes_1); }

    if (article.user_id._id.toString() !== req.user.id.toString()) { res.status(403); throw new Error(messages.article.mes_5); }
  }
  const deletedArticle = await articleService.deleteOneArticle(req.params.id);

  if (deletedArticle) {
    res.status(200).json({
      message: messages.article.mes_8, Article: {
        title: deletedArticle.title,
        summary: deletedArticle.summary,
        blog_data: deletedArticle.summary,
        article_category: deletedArticle.article_category,
        visibility: deletedArticle.visibility
      }
    });
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


  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(400); throw new Error(messages.article.mes_10);
  }

});


//@ Desc Get Single Category
//@route GET /api/articles/category/:cat_name
//@ access Public

const getSingleArticleCategory = asyncHandler(async (req, res) => {

  const category = await articleService.findCategory(req.params.cate_name);


  if (category) {
    res.status(200).json(category);
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
  if (error) { res.status(403); throw new Error(`${error}`); }

  let cate_name = category_name.toLowerCase();
  let update_cate_name = updated_category_name.toLowerCase();

  const categoryAvailable = await articleService.findCategory(cate_name);
  const updateCategoryAvailable = await articleService.findCategory(update_cate_name);

  if (!categoryAvailable && update_category === "true") { res.status(400); throw new Error(`${category_name}' - ${messages.article.mes_13}`); }

  if (categoryAvailable && update_category === "false") { res.status(400); throw new Error(`${category_name}' - ${messages.article.mes_14}`); }



  if (categoryAvailable === null && update_category === "false") {

    category = await articleService.createCategory(cate_name, category_desc);

    if (category) {
      res.status(201).json({
        New_category: {
          category_name: category.category_name,
          category_desc: category.category_desc,
        },
      });
    }
  } else if (update_category === "true") {


    if (updateCategoryAvailable) {
      res.status(400);
      throw new Error(`${updated_category_name}' - ${messages.article.mes_11}`);
    }

    const updatedCategory = await articleService.updateCategory(cate_name, update_cate_name, updated_category_desc);

    if (!updatedCategory) {
      res.status(400); throw new Error(`${category_name} ${messages.article.mes_12}`);
    }

    res.status(200).json({
      updated_category: {
        category_name: updatedCategory.category_name,
        category_desc: updatedCategory.category_desc,
      },
    });
  }
});

//---------------------------------------------------------------


//------------------------------------------------------
//                COMMENTS CONTROLLER
//------------------------------------------------------



//@ Desc Get All comments of an Article
//@route GET /api/articles/comments/:id
//@ access Public

const getComments = asyncHandler(async (req, res) => {

  const comments = await articleService.findComments(req.params.id);

  res.status(200).json(comments);
});


//---------------------------------------------------------------



//@ Desc Create New Comment
//@route POST /api/articles/comments/:id
//@ access Private

const createComment = asyncHandler(async (req, res) => {

  if (req.header("v2_header") !== "web") {
    const { comment } = req.body;

    if (!comment) { res.status(400); throw new Error(messages.comment.mes_1); }

    const newComment = await articleService.createComment(req.user.id, req.params.id, comment)

    if (!newComment) {
      res.status(400); throw new Error(messages.comment.mes_2);
    } else { res.status(201).json({ message: messages.comment.mes_3 }); }

  } else {
    const { user_id, article_id, comment_data, parent_id } = req.body;
    const newComment = await articleService.createComment(
      user_id,
      article_id,
      comment_data,
      parent_id);

    if (!newComment) {
      res.status(400); throw new Error(messages.comment.mes_2);
    } else {
      if (req.header("v2_header") == "web") { res.status(201).json({ newComment }); };
      res.status(201).json({ message: messages.comment.mes_3 });
    }
  }

});

//---------------------------------------------------------------



//@ Desc Update an Existing Comment
//@route PUT /api/articles/comments/id
//@ access Private

const updateComment = asyncHandler(async (req, res) => {
  const { comment_data } = req.body;

  let comment = ''
  const fiveMinutes = 300000;

  if (req.header("v2_header") !== "web") {

    if (!comment_data) { res.status(400); throw new Error(messages.comment.mes_1); }

    comment = await articleService.findComment(req.params.id);

    if (!comment) { res.status(404); throw new Error(messages.comment.mes_4); }

    if (comment.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error(messages.comment.mes_5);
    }
    
  // timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;

  };
  const timePassed = (comment) ? new Date() - new Date(comment.createdAt) > fiveMinutes : false;

  if (!timePassed) {
    const updatedComment = await articleService.updateComment(req.params.id, comment_data);

    if (!updatedComment) { res.status(400); throw new Error(messages.comment.mes_6); }
    else {
      
      if (req.header("v2_header") === "web") { res.status(200).json(updatedComment); }
      else {
      res.status(200).json({
        message: messages.comment.mes_7, data: {
          old_comment: comment.comment_data,
          updated_comment: updatedComment.comment_data
        }
      })};
    }}
   else {
    res.status(403); throw new Error(messages.comment.mes_10);
  }
});

//---------------------------------------------------------------


//@ Desc Delete Comment
//@route DELETE /api/articles/comments/id
//@ access Private

const deleteComment = asyncHandler(async (req, res) => {
let comment = ''
const fiveMinutes = 300000;
  if (req.header("v2_header") !== "web") {

    comment = await articleService.findComment(req.params.id);

    if (!comment) { res.status(404); throw new Error(messages.comment.mes_4); }

    if (comment.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error(messages.comment.mes_12);
    }
  }

  // const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const timePassed = (comment) ? new Date() - new Date(comment.createdAt) > fiveMinutes : false;
  if (!timePassed) {
  
  const delComment = await articleService.deleteComment(req.params.id);
  if (!delComment) { res.status(400); throw new Error(messages.comment.mes_8); }
  else {
    res.status(200).json({ message: messages.comment.mes_9, Deleted_comment: delComment.comment_data });
  } } else {
    res.status(403);
      throw new Error(messages.comment.mes_11);
  }
});

//--------------------------------------------------------------






// Exporting Modules
module.exports = {
  getAllArticles,
  getAllArticlesByCategory,
  getSingleArticleCategory,
  getSingleArticle,
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




// ------------------ REFERENCE POPULATE --------------------

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
