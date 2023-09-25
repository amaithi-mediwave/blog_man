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

} = require("../controllers/articleController");

const validateToken = require("../middleware/validateToken");

// router.use(validateToken)



//------------------------------------------------------
//          ARTICLE ROUTES
//------------------------------------------------------

router.route("/").get(getAllArticles)

// router.route("/:id").get(getSingleArticle);
// router.get("/:id", getSingleArticle) //-- Culprit

router.post("/", createArticle);

// router.post("/", validateToken, createArticle); - FOR REST API

router.get("/user", validateToken, getUserArticles);

// router.get("/user/:id", validateToken, getUserArticle);

router.put("/user/:id", validateToken, updateArticle);
router.put("/:id", updateArticle);


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

router.get("/user", validateToken, getUserArticles);

// router.get("/user/:id", validateToken, getUserArticle);

router.put("/comments/:id", validateToken, updateComment);

router.delete("/comments/:id", validateToken, deleteComment);




// V2 API
router.get("/:id", getSingleArticle);



// MODULE EXPORTS
module.exports = router;





