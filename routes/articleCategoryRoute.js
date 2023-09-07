
const express = require("express");
const router = express.Router();

const { createUpdateArticleCategory, getAllArticleCategories } = require("../controllers/articleCategoryController")

const validateToken = require("../middleware/validateTokenHandler")




// router.use(validateToken);

router.get("/", getAllArticleCategories);

router.post("/", validateToken, createUpdateArticleCategory);


module.exports = router;