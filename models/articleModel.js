const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    article_category: {
      type: String,
      required: true,
    },
    // article_category_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "articleCategory",
    // },

    visibility: {
        type: Boolean,
        required: true,
    },
    published_at: {
      type: Date || null
      // default: Date.now
    }
  },
  {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
  versionKey: false 
}


);

module.exports = mongoose.model("Article", articleSchema);
