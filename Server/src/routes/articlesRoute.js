const express = require("express");
const router = express.Router();



let control = require("../controllers/index")



const validateToken = require("../middleware/validateToken");

// router.use(validateToken)



//------------------------------------------------------
//          ARTICLE ROUTES
//------------------------------------------------------

router.route("/").get(control.Article.getAllArticles)

router.get("/category/:id", control.Article.getAllArticlesByCategory);

router.post("/", validateToken, control.Article.createArticle);

router.get("/user", validateToken, control.Article.getUserArticles);

router.put("/user/:id", validateToken, control.Article.updateArticle);

router.delete("/user/:id", validateToken, control.Article.deleteArticle);

//------------------------------------------------------
//          ARTICLE CATEGORY ROUTES
//------------------------------------------------------

router.get("/category", control.Article.getAllArticleCategories);

router.post("/category", validateToken, control.Article.createUpdateArticleCategory);

//------------------------------------------------------
//          ARTICLE COMMENTS ROUTES
//------------------------------------------------------

router.route("/comments/:id").get(control.Article.getComments)

router.post("/comments/:id", validateToken, control.Article.createComment);



router.get("/user", validateToken, control.Article.getUserArticles);

router.get("/user/:id", validateToken, control.Article.getUserArticle);

router.put("/comments/:id", validateToken, control.Article.updateComment);

router.delete("/comments/:id", validateToken, control.Article.deleteComment);

//------------------------------------------------------
//          ARTICLE ROUTES - Non Token (Get - Single, all)
//------------------------------------------------------
router.get("/:id", control.Article.getSingleArticle);
router.get("/user-all/:id", control.Article.getUserArticles);

// router.get("/category-info/:cate_name", control.Article.getSingleArticleCategory);



// MODULE EXPORTS
module.exports = router;





