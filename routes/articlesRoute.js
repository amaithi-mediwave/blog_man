const express = require("express");
const router = express.Router();

const {
    getAllArticles,
    getUserArticles,
    createArticle,
    getUserArticle,
    updateArticle,
    deleteArticle,

} = require("../controllers/articleController");

const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken)
router.route("/").get(getAllArticles)

router.post("/", validateToken, createArticle);

router.get("/user",validateToken, getUserArticles);

router.get("/user/:id", validateToken, getUserArticle);

router.put("/user/:id", validateToken, updateArticle);

router.delete("/user/:id", validateToken, deleteArticle);

module.exports = router;
