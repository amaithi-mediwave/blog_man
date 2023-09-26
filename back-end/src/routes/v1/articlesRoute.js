const express = require("express");
const router = express.Router();

const {
    getAllArticles,
    getSingleArticle,
    // getUserArticle,
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

} = require("../../controllers/v1/articleController");

let control = require("../../controllers/index")



const validateToken = require("../../middleware/validateToken");

// router.use(validateToken)



//------------------------------------------------------
//          ARTICLE ROUTES
//------------------------------------------------------

router.route("/").get(control.v1_article.getAllArticles)

// router.route("/:id").get(getSingleArticle);
// router.get("/:id", getSingleArticle) //-- Culprit

router.post("/", validateToken ,control.v1_article.createArticle);

// router.post("/", validateToken, createArticle); - FOR REST API

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

router.route("/comments/:id").get(getComments)

router.post("/comments/:id", validateToken, createComment);

router.get("/user", validateToken, control.v1_article.getUserArticles);

// router.get("/user/:id", validateToken, getUserArticle);

router.put("/comments/:id", validateToken, updateComment);

router.delete("/comments/:id", validateToken, deleteComment);




// V2 API
router.get("/:id", control.v1_article.getSingleArticle);



// MODULE EXPORTS
module.exports = router;





