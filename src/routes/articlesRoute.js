const express = require("express");
const router = express.Router();

const {
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
    // getUserComment,
    deleteComment,

} = require("../controllers/articleController");

const validateToken = require("../utils/validateToken");

// router.use(validateToken)



//------------------------------------------------------
//ARTICLE ROUTES
//------------------------------------------------------

router.route("/").get(getAllArticles)

router.post("/", validateToken, createArticle);

router.get("/user",validateToken, getUserArticles);

router.get("/user/:id", validateToken, getUserArticle);

router.put("/user/:id", validateToken, updateArticle);

router.delete("/user/:id", validateToken, deleteArticle);

//------------------------------------------------------
//          ARTICLE CATEGORY ROUTES
//------------------------------------------------------

router.get("/category", getAllArticleCategories);

router.post("/category", validateToken, createUpdateArticleCategory);

//------------------------------------------------------
//          ARTICLE COMMENTS ROUTES
//------------------------------------------------------

router.route("/comments/:id").get(getComments)

router.post("/comments/:id", validateToken, createComment);

// router.get("/user",validateToken, getUserArticles);

// router.get("/user/:id", validateToken, getUserArticle);

router.put("/comments/:id", validateToken, updateComment);

router.delete("/comments/:id", validateToken, deleteComment);


//------------------------------------------------------
//          ARTICLE CATEGORY ROUTES
//------------------------------------------------------

router.get("/category", getAllArticleCategories);

router.post("/category", validateToken, createUpdateArticleCategory);









// export Router
module.exports = router;





