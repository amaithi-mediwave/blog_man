const joi = require("joi");

//---------------------------------------------------------------
//              VALIDATOR - REGISTER USER
//---------------------------------------------------------------

function validateArticle(
  title,
  summary,
  blog_data,
  article_category,
  visibility
) {
  let article = { title, summary, blog_data, article_category, visibility };

  const joiSchema = joi
    .object({
      title: joi.string().min(5).max(100).required(),

      summary: joi.string().min(5).max(500).required(),

      blog_data: joi.string().min(10).required(),

      article_category: joi.string().min(5).max(15).required(),

      visibility: joi.string().valid("true").valid("false").required(),
    })
    .options({ abortEarly: true });

  return joiSchema.validate(article);
}


//---------------------------------------------------------------
//              VALIDATOR - ARTICLE CATEGORY
//---------------------------------------------------------------

function validateArticleCategory(
  category_name,
  category_desc,
  update_category,
  updated_category_name,
  updated_category_desc
) {
  let category = { category_name, category_desc, update_category, updated_category_name, updated_category_desc };

  const joiSchema = joi
    .object({
      category_name: joi.string().min(5).max(15).required(),

      category_desc: joi.string().min(5).max(500).required(),

      update_category: joi.string().valid("true").valid("false").required(),

      updated_category_name: joi.alternatives().conditional('update_category', {
        is: "true",
        then: joi.string().min(5).max(15).required(),
        otherwise: joi.optional(),
      }),

      updated_category_desc: joi.alternatives().conditional('update_category', {
        is: 'true',
        then: joi.string().min(5).max(500).required(),
        otherwise: joi.optional(),
      }),

    })
    .options({ abortEarly: true });

  return joiSchema.validate(category);
}


//----------------------------------------------------------------------------


// Module Export
module.exports = {
  validateArticle,

  validateArticleCategory

};
