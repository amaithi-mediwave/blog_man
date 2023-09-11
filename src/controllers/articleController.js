const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

const { articleModel,
  articleCommentsModel,
  articleCategoryModel} = require("../models/articleModel")



//@ Desc Get All Articles
//@route GET /api/articles
//@ access Public

const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await articleModel.find({ visibility: true}, {user_id:0, __v: 0, created_at:0 ,updated_at:0, }); //exclude fields by using the second parameter of the find method
  res.status(200).json(articles);
});

//---------------------------------------------------------------

//@ Desc Get User-All Articles
//@route GET /api/articles/user
//@ access Private

const getUserArticles = asyncHandler(async (req, res) => {
  const user_articles = await articleModel.find({ user_id: req.user.id }, {user_id:0, __v: 0});
  res.status(200).json(user_articles);
});

//---------------------------------------------------------------

//@ Desc Get a Single - User Article
//@route GET /api/articles/user/id

const getUserArticle = asyncHandler(async (req, res) => {

//   try {
//     const { id } = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       res.status(400);
//       throw new Error("Invalid id"); // validating `id`
//     };
//     const user_article = await articleModel.findById(req.params.id, {user_id:0, __v: 0});
//     if (!user_article) { 
//       res.status(404); 
//       throw new Error('No Article is found with the given id.'); };
    
//     res.status(200).json({user_article});
//   } catch (error) {
//     console.error(error)
//     // next(error)
//     response.status(501).json('internal server error')
//   };
// });






//   const { id } = req.params.id;
// if (!mongoose.Types.ObjectId.isValid(id)) {
//   res.status(400);
//   throw new Error("Invalid id"); // validating `id`
// };
    const user_article = await articleModel.findById(req.params.id, {user_id:0, __v: 0});
    // console.log(req.params.id)
    console.log(user_article);
  if (!user_article) {
    res.status(404);
    throw new Error("Article Not Exists");}

    res.status(200).json({user_article});
  });

//---------------------------------------------------------------


//@ Desc Create New Article
//@route POST /api/articles
//@ access Private

const createArticle = asyncHandler(async (req, res) => {
  const { title, summary, blog_data, article_category, visibility } = req.body;

  if (!title || !summary || !blog_data || !article_category) {
    res.status(400);
    throw new Error("Fill out all the fields");
  }
//  category_ = await ArticleCategory.findOne({category_name});

//  if(!category_) {
//   res.status(400);
//     throw new Error("Fill out the Article Category properly");
//  }
// let pub = null;         // var variable = (condition) ? (true block) : (else block)

var pub = (!visibility === true) ? null : Date.now();

const article = await articleModel.create({
  user_id: req.user.id,
  title,
  summary,
  blog_data,
  article_category,
  visibility,
  published_at: pub
   }); 

  // console.log(article);
  res.status(201).json({ message: `article ${article.title} is created` });
});

//---------------------------------------------------------------


//@ Desc Update an Article
//@route PUT /api/articles/user/id
//@ access Private

const updateArticle = asyncHandler(async (req, res) => {
    const { title, summary, blog_data, article_category, visibility } = req.body;

  const article = await articleModel.findById(req.params.id);
  if (!article) {
    res.status(404);
    throw new Error("Article Not Exists");
  }
  if (article.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "You don't have permission to update the Article posted by another author"
    );
  }
  var pub = (!visibility === true) ? null : Date.now();
// console.log(article)
  const updatedArticle = await articleModel.findByIdAndUpdate(
    {_id:req.params.id},
    {title,
      summary,
      blog_data,
      article_category,
      visibility,
      published_at: pub},
    { new: true });

  res.status(200).json({
    message: "Article has been updated",
    updated: updatedArticle,
  });
});


//---------------------------------------------------------------


//@ Desc Delete an Article
//@route DELETE /api/articles/user/id
//@ access Private

const deleteArticle = asyncHandler(async (req, res) => {
    const article = await articleModel.findById({_id: req.params.id});
    // console.log(article);
    if (!article) {
      res.status(404);
      throw new Error("article Not Found");
    }
    if(article.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have the permission to delete other user contacts");
    };
  await articleModel.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Article Deleted", Article: {
      "title": article.title, 
      "summary": article.summary,
      "blog_data": article.summary,
      "article_category": article.article_category,
      "visibility": article.visibility
  }});
  });


//------------------------------------------------------
//                CATEGORY CONTROLLER
//------------------------------------------------------



//@ Desc Get All Categories
//@route GET /api/articles/category
//@ access Public

const getAllArticleCategories = asyncHandler(async (req, res) => {
  const categories = await articleCategoryModel.find(
    {},
    { _id:0, __v: 0, created_at: 0, updated_at: 0 }
  ); //exclude fields by using the second parameter of the find method
  res.status(200).json(categories);
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

  if (!category_name || !category_desc) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
  //   let date = new Date(dob)
  //   let dat = date.toISOString()
  let cate_name = category_name.toLowerCase();

  const categoryAvailable = await articleCategoryModel.findOne({ category_name: cate_name });
console.log(categoryAvailable)


  if (categoryAvailable === null && !update_category === true) {
    // Adding adding category to the DB
    const category = await articleCategoryModel.create({
        category_name: cate_name,
      category_desc,
    });

    console.log(`Category Created ${category.category_name}`);

    if (category) {
      res.status(201).json({
        New_category: {
          category_name: category.category_name,
          category_desc: category.category_desc,
        },
      });
    }
  } else if (!categoryAvailable === null && update_category) {
    console.log(categoryAvailable)
    if (!update_category === true || !updated_category_name || !updated_category_desc) {
      res.status(400);
      throw new Error("All category update parameters are mandatory for updating the category");
    }
    const updatedCategory = await articleCategoryModel.findOneAndUpdate(
      { category_name: cate_name },
      { category_name: updated_category_name, category_desc: updated_category_desc },
      {
        new: true, // for retriving the newly updated document from the DB
      }
    );

    console.log(`Updated Category ${updatedCategory.category_name}`);
    res.status(200).json({
      updated_category: {
        category_name: updatedCategory.category_name,
        category_desc: updatedCategory.category_desc,
      },
    });}

    else if (categoryAvailable === null) {
        res.status(404);
    throw new Error(`Category ${category_name} is Not Exists and Can't Update the Category`);
    }

  else {
    res.status(400);
    throw new Error(`Category ${category_name} Already Exists and update_category parameters is missing make sure you gave it properly`);
  }
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

    const comments = await articleCommentsModel.find({article_id: req.params.id},
      { __v: 0, created_at: 0, updatedAt: 0 }).populate([{path: 'user_id', model: 'User', select: 'username -_id' },
                                                                {path: 'article_id', model: 'Article', select: 'title -_id'}]
      ); //exclude fields by using the second parameter of the find method
  

  res.status(200).json(comments);
});


//---------------------------------------------------------------



//@ Desc Create New Comment
//@route POST /api/articles/comments/:id
//@ access Private

const createComment = asyncHandler(async (req, res) => {
    const { comment } = req.body;
  
    if (!comment) {
      res.status(400);
      throw new Error("Enter your Comment");
    }
  
    const new_comment = await articleCommentsModel.create({
        user_id: req.user.id,
        article_id: req.params.id,
        comment_data: comment,
      });
      
      console.log(new_comment);
    res.status(201).json({ message: `Your Comment is created and published`});
  });
  
//---------------------------------------------------------------



//@ Desc Update an Existing Comment
//@route PUT /api/articles/comments/id
//@ access Private

const updateComment = asyncHandler(async (req, res) => {
    const { comment_data } = req.body;

  const comment = await articleCommentsModel.findById({_id: req.params.id});
  
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

  const updatedcomment = await articleCommentsModel.findByIdAndUpdate(
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

//---------------------------------------------------------------


//@ Desc Delete Comment
//@route DELETE /api/articles/comments/id
//@ access Private

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await articleCommentsModel.findById(req.params.id);
  console.log(comment);
  if (!comment) {
    res.status(404);
    throw new Error("Comment Not Found");
  }
  if(comment.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have the permission to delete other users Comment");
  };
await articleCommentsModel.findByIdAndDelete(req.params.id);
  res.status(200).json({message: "Comment Deleted", Deleted_comment: comment.comment_data});
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
