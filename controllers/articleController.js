const asyncHandler = require("express-async-handler");
const Article = require("../models/articleModel");

//@ Desc Get All Articles
//@route GET /api/articles
//@ access Public

const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({
    visibility: "true",
    function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("First function call : ", docs);
      }
    },
  });
  res.status(200).json(articles);
});

//@ Desc Get User-All Articles
//@route GET /api/articles/user
//@ access Private

const getUserArticles = asyncHandler(async (req, res) => {
  const user_articles = await Article.find({ user_id: req.user.id });
  res.status(200).json(user_articles);
});


//@ Desc Get a Single - User Article
//@route GET /api/articles/user/id

const getUserArticle = asyncHandler(async (req, res) => {
    const user_article = await Article.findById(req.params.id);
    console.log(req.params.id)
  if (!user_article) {
    res.status(404);
    throw new Error("Article Not Exists");}

    res.status(200).json({user_article});
  });


//@ Desc Create New Article
//@route POST /api/articles
//@ access Private

const createArticle = asyncHandler(async (req, res) => {
  const { title, summary, blog_data, visibility } = req.body;

  if (!title || !summary || !blog_data || !visibility) {
    res.status(400);
    throw new Error("Fill out all the fields");
  }

  const article = await Article.create({
    user_id: req.user.id,
    title,
    summary,
    blog_data,
    visibility,
  });
  res.status(201).json({ message: `article ${article.title} is created` });
});

//@ Desc Update an Article
//@route PUT /api/articles/user/id
//@ access Private

const updateArticle = asyncHandler(async (req, res) => {
    const { title, summary, blog_data, visibility } = req.body;

  const article = await Article.findById(req.params.id);
  if (!article) {
    res.status(404);
    throw new Error("Article Not Exists");
  }
  if (article.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "You don't have permission to delete the Article posted by another author"
    );
  }
// console.log(article)
  const updatedArticle = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true });

  res.status(200).json({
    message: "Article has been updated",
    updated: updatedArticle,
  });
});



//@ Desc Delete an Article
//@route DELETE /api/articles/user/id
//@ access Private

const deleteArticle = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!article) {
      res.status(404);
      throw new Error("article Not Found");
    }
    if(article.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have the permission to delete other user contacts");
    };
  await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Article Deleted", Article: article});
  });





module.exports = {
  getAllArticles,
  getUserArticle,
  getUserArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};
