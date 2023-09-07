const mongoose = require("mongoose");

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

module.exports = mongoose.model("Article_Category", articleCategorySchema);
