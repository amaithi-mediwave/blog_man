const mongoose = require("mongoose");

const articleCommentsSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    article_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Article",
    },
    comment_data: {
      type: String,
      required: true,
    },
  },
  { timestamps: true,
    versionKey: false },
);

module.exports = mongoose.model("Article_Comments", articleCommentsSchema);
