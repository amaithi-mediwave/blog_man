const express = require("express");
const router = express.Router();



let control = require("../../controllers/index")



const validateToken = require("../../middleware/validateToken");

// router.use(validateToken)



//------------------------------------------------------
//          ARTICLE ROUTES
//------------------------------------------------------

router.route("/").get(control.v1_article.getAllArticles)

router.route("/:id").get(control.v1_article.getSingleArticle);
// router.get("/:id", getSingleArticle) //-- Culprit

router.post("/", validateToken, control.v1_article.createArticle);

router.get("/user", validateToken, control.v1_article.getUserArticles);

// router.get("/user/:id", validateToken, getUserArticle);

router.put("/user/:id", validateToken, control.v1_article.updateArticle);
// router.put("/:id", control.v1_article.updateArticle);

router.delete("/user/:id", validateToken, control.v1_article.deleteArticle);

//------------------------------------------------------
//          ARTICLE CATEGORY ROUTES
//------------------------------------------------------

router.get("/category", control.v1_article.getAllArticleCategories);

router.post("/category", validateToken, control.v1_article.createUpdateArticleCategory);

//------------------------------------------------------
//          ARTICLE COMMENTS ROUTES
//------------------------------------------------------

router.route("/comments/:id").get(control.v1_article.getComments)

router.post("/comments/:id", validateToken, control.v1_article.createComment);

router.get("/user", validateToken, control.v1_article.getUserArticles);

router.get("/user/:id", validateToken, control.v1_article.getUserArticle);

router.put("/comments/:id", validateToken, control.v1_article.updateComment);

router.delete("/comments/:id", validateToken, control.v1_article.deleteComment);





// MODULE EXPORTS
module.exports = router;





