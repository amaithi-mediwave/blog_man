const express = require("express");
const router = express.Router();


let control = require("../../controllers/index")

//------------------------------------------------------
//          ARTICLE ROUTES
//------------------------------------------------------

router.get("/", control.v2_article.getAllArticles);
router.get("/category/:id", control.v2_article.getAllArticlesByCategory);
// router.route("/:id").get(getSingleArticle);
// router.get("/:id", getSingleArticle) //-- Culprit

router.post("/", control.v2_article.createArticle);

router.put("/:id", control.v2_article.updateArticle);

router.delete("/:id", control.v2_article.deleteArticle);

//------------------------------------------------------
//          ARTICLE CATEGORY ROUTES
//------------------------------------------------------

router.get("/category", control.v2_article.getAllArticleCategories);

router.post("/category", control.v2_article.createUpdateArticleCategory);

//------------------------------------------------------
//          ARTICLE COMMENTS ROUTES
//------------------------------------------------------

router.get("/comments/:id", control.v2_article.getComments);

router.post("/comments/:id", control.v2_article.createComment);

// router.get("/user/:id", validateToken, getUserArticle);

router.put("/comments/:id", control.v2_article.updateComment);

router.delete("/comments/:id", control.v2_article.deleteComment);




// V2 API
router.get("/:id", control.v2_article.getSingleArticle);
router.get("/user/:id", control.v2_article.getUserArticles);


// MODULE EXPORTS
module.exports = router;





