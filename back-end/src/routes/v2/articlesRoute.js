const express = require("express");
const router = express.Router();

const {
    getAllArticles,
    getSingleArticle,
    getUserArticles,

    createArticle,
    updateArticle,
    deleteArticle,

    createUpdateArticleCategory,
    getAllArticleCategories,

    createComment,
    getComments,
    updateComment,
    // getUserComment,
    deleteComment,

} = require("../../controllers/v2/articleController");

let control = require("../../controllers/index")

//------------------------------------------------------
//          ARTICLE ROUTES
//------------------------------------------------------


router.get("/", control.v2_article.getAllArticles);
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

router.route("/comments/:id").get(getComments)

router.post("/comments/:id", createComment);



// router.get("/user/:id", validateToken, getUserArticle);

router.put("/comments/:id", updateComment);

router.delete("/comments/:id", deleteComment);




// V2 API
router.get("/:id", control.v2_article.getSingleArticle);
router.get("/user/:id", control.v2_article.getUserArticles);


// MODULE EXPORTS
module.exports = router;





