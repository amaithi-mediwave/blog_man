const v1Article = require("./v1/articleController");
const v1User = require("./v1/userController");

const v2Article = require("./v2/articleController");
const v2User = require("./v2/userController");


module.exports = {
    v1_article: v1Article,
    v1_user: v1User,

    v2_article: v2Article,
    v2_user: v2User
}