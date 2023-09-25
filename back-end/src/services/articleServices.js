
// import mongoose from 'mongoose'


const { articleModel,
    articleCommentsModel,
    articleCategoryModel } = require("../models/articleModel");



//------------------------------------------------------
//          TO FIND ALL ARTICLES
//------------------------------------------------------
const findArticles = async () => {
    const article = await articleModel.find(
        { visibility: true },
        { user_id: 0, __v: 0, created_at: 0, updated_at: 0, }) //exclude fields by using the second parameter of the find method
        .populate(
            [
                {
                    path: 'article_category_id',
                    model: 'articleCategory',
                    // select: 'category_name -_id'
                }]);

    return article
}

//------------------------------------------------------
//          FIND USER ARTICLES
//------------------------------------------------------
const findUserArticles = async (id) => {
    const userArticle = await articleModel.find({ user_id: id }, { user_id: 0, __v: 0 })
        .populate([{ path: 'article_category_id', model: 'articleCategory', select: 'category_name -_id' }]);

    return userArticle
}


//------------------------------------------------------
//          FIND ONE ARTICLE OF THE USER
//------------------------------------------------------
const findUserOneArticle = async (id) => {
    const userOneArticle = await articleModel.findById(id)
        .populate([ { path: 'user_id', model: 'user', select: 'username' },
                    { path: 'article_category_id', model: 'articleCategory' }
    ]);

    return userOneArticle
};

// const findOneArticle = async (id) => {
//     const oneArticle = await articleModel.findById({_id: id});
//         // .populate([{ path: 'article_category_id', model: 'articleCategory' },
//         // { path: 'user_id', model: 'user', select: 'username' }]);

//     return oneArticle
// };

//------------------------------------------------------
//          CREATE A NEW ARTICLE
//------------------------------------------------------
const createArticle = async (id, title, summary, blog_data, cate_id, visibility, pub, photo) => {
    const article = await articleModel.create({
        user_id: id,
        title,
        summary,
        blog_data,
        // article_category,
        article_category_id: cate_id,
        visibility,
        photo,
        published_at: pub
    });
    return article

};

//------------------------------------------------------
//          UPDATE AN EXISTING ARTICLE
//------------------------------------------------------
const updateOneArticle = async (id, title, summary, blog_data, cate_id, visibility, pub) => {
    const updateArticle = await articleModel.findByIdAndUpdate(
        { _id: id },
        {
            title,
            summary,
            blog_data,
            article_category_id: cate_id,
            visibility,
            published_at: pub
        },
        { new: true }).populate([{ path: 'article_category_id', model: 'articleCategory', select: 'category_name -_id' }]);
    return updateArticle
}


//------------------------------------------------------
//          DELETE AN ARTICLE
//------------------------------------------------------
const deleteOneArticle = async (id) => {
    delArticle = await articleModel.findByIdAndDelete(id);
    return delArticle
}




//------------------------------------------------------
//          FIND A SPECIFIC CATEGORY
//------------------------------------------------------
const findCategory = async (cate_name) => {
    const category = await articleCategoryModel.findOne({ category_name: cate_name });
    return category
}

//------------------------------------------------------
//          GET ALL AVAILABLE CATEGORIES
//------------------------------------------------------
const findAllCategories = async () => {
    // const allCategories = await articleCategoryModel.find({},
    //     { __v: 0, created_at: 0, updated_at: 0 },
    const allCategories = await articleCategoryModel.find(); //exclude fields by using the second parameter of the find method

    return allCategories;
}


//------------------------------------------------------
//          CREATE A NEW CATEGORY
//------------------------------------------------------
const createCategory = async (category_name, category_desc) => {
    const newcategory = await articleCategoryModel.create({ category_name, category_desc });
    return newcategory
}

//------------------------------------------------------
//          UPDATE CATEGORY
//------------------------------------------------------
const updateCategory = async (cate_name, update_cate_name, updated_category_desc) => {
    const updCategory = await articleCategoryModel.findOneAndUpdate(
        { category_name: cate_name },
        { category_name: update_cate_name, category_desc: updated_category_desc },
        {
            new: true, // for retriving the newly updated document from the DB
        }
    );
    return updCategory
}


//------------------------------------------------------
//          FIND ALL COMMENTS OF AN ARTICLE
//------------------------------------------------------
const findComments = async (id) => {
    const comments = await articleCommentsModel.find({ article_id: id },
        { __v: 0, created_at: 0, updatedAt: 0 }).populate([{ path: 'user_id', model: 'user', select: 'username -_id' },
        { path: 'article_id', model: 'article', select: 'title -_id' }]
        );
    return comments
}

//------------------------------------------------------
//          CREATE A NEW COMMENT
//------------------------------------------------------
const createComment = async (user_id, article_id, comment) => {
    const createdComment = await articleCommentsModel.create({
        user_id,
        article_id,
        comment_data: comment,
    });
    return createdComment
}

//------------------------------------------------------
//          FIND A SPECIFIC COMMENT
//------------------------------------------------------
const findComment = async (id) => {
    const comment = await articleCommentsModel.findById({ _id: id });
    return comment
}

//------------------------------------------------------
//          UPDATE A COMMENT
//------------------------------------------------------
const updateComment = async (id, comment_data) => {
    const updateOneComment = await articleCommentsModel.findByIdAndUpdate(
        { _id: id },
        { comment_data },
        { new: true });
    return updateOneComment
}

//------------------------------------------------------
//          DELETE A COMMENT
//------------------------------------------------------
const deleteComment = async (id) => {
    const delComment = await articleCommentsModel.findByIdAndDelete(id);
    return delComment
}


// MODULE EXPORTS
module.exports = {
    findArticles,
    findUserArticles,
    findUserOneArticle,
    // findOneArticle,
    createArticle,
    updateOneArticle,
    deleteOneArticle,

    findCategory,
    findAllCategories,
    createCategory,
    updateCategory,

    findComments,
    createComment,
    findComment,
    updateComment,
    deleteComment,

}

