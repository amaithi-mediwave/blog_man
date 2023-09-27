const mongoose = require("mongoose");



//------------------------------------------------------
//            ARTICLE MODEL
//------------------------------------------------------
const articleSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    blog_data: {
      type: String,
      required: true,
    },
    article_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "articleCategory",
    },
    photo: {
      type: String,
      required: false,
    },
    visibility: {
      type: Boolean,
      required: true,
    },
    published_at: {
      type: Date || null

    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
  }
);


//------------------------------------------------------
//            COMMENTS MODEL
//------------------------------------------------------

const articleCommentsSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    article_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "article",
    },
    comment_data: {
      type: String,
      required: true,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    }
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);
//------------------------------------------------------
//            CATEGORY(ARTICLE) MODEL
//------------------------------------------------------

const articleCategorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      unique: true,
      required: true,
    },
    category_desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);



//---------------------------------------------------------------


// Creating Model Objects
articleModel = mongoose.model("article", articleSchema);                            //- ARTICLE MODEL
articleCommentsModel = mongoose.model("articleComments", articleCommentsSchema);    //- COMMENTS(Article) MODEL
articleCategoryModel = mongoose.model("articleCategory", articleCategorySchema);    // - CATEGORY(Article) MODEL

//---------------------------------------------------------------



// Exporting Models
module.exports = {
  articleModel,
  articleCommentsModel,
  articleCategoryModel
}