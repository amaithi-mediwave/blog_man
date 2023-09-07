const express = require('express');
const router = express.Router();


const {
    getComments,
    // getUserComment,
    createComment,
    updateComment,
    deleteComment

} = require("../controllers/commentsController");

const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken)

router.route("/:id").get(getComments)

router.post("/:id", validateToken, createComment);

// router.get("/user",validateToken, getUserArticles);

// router.get("/user/:id", validateToken, getUserArticle);

router.put("/:id", validateToken, updateComment);

router.delete("/:id", validateToken, deleteComment);

module.exports = router;
