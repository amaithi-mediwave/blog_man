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
      required: [true, "Please Provide the Title"],
    },
    summary: {
      type: String,
      required: [true, "Please add the summary"],
    },
    blog_data: {
      type: String,
      required: [true, "Please add the blog_data"],
    },
    visibility: {
        type: String,
        required: [true, "Please provide the visibility"],
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("article", articleSchema);
