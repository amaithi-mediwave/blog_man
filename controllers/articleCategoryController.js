const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const User_info = require("../models/userInfo");
const Article_Category = require("../models/articleCategoryModel");

//@ Desc Get All Articles
//@route GET /api/articles/category
//@ access Public

const getAllArticleCategories = asyncHandler(async (req, res) => {
  const categories = await Article_Category.find(
    {},
    { _id:0, __v: 0, created_at: 0, updated_at: 0 }
  ); //exclude fields by using the second parameter of the find method
  res.status(200).json(categories);
});

//@desc Create Article Category
//@route POST /api/articles/category
//@access private

const createUpdateArticleCategory = asyncHandler(async (req, res) => {
  const {
    category_name,
    category_desc,
    update_category,
    updated_category_name,
    updated_category_desc,
  } = req.body;

  if (!category_name || !category_desc) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }
  //   let date = new Date(dob)
  //   let dat = date.toISOString()
  let cate_name = category_name.toLowerCase();

  const categoryAvailable = await Article_Category.findOne({ category_name: cate_name });
console.log(categoryAvailable)


  if (categoryAvailable === null && !update_category === true) {
    // Adding adding category to the DB
    const category = await Article_Category.create({
        category_name: cate_name,
      category_desc,
    });

    console.log(`Category Created ${category.category_name}`);

    if (category) {
      res.status(201).json({
        New_category: {
          category_name: category.category_name,
          category_desc: category.category_desc,
        },
      });
    }
  } else if (!categoryAvailable === null && update_category) {
    console.log(categoryAvailable)
    if (!update_category === true || !updated_category_name || !updated_category_desc) {
      res.status(400);
      throw new Error("All category update parameters are mandatory for updating the category");
    }
    const updatedCategory = await Article_Category.findOneAndUpdate(
      { category_name: cate_name },
      { category_name: updated_category_name, category_desc: updated_category_desc },
      {
        new: true, // for retriving the newly updated document from the DB
      }
    );

    console.log(`Updated Category ${updatedCategory.category_name}`);
    res.status(200).json({
      updated_category: {
        category_name: updatedCategory.category_name,
        category_desc: updatedCategory.category_desc,
      },
    });}

    else if (categoryAvailable === null) {
        res.status(404);
    throw new Error(`Category ${category_name} is Not Exists and Can't Update the Category`);
    }

  else {
    res.status(400);
    throw new Error(`Category ${category_name} Already Exists and update_category parameters is missing make sure you gave it properly`);
  }
});

//@desc current user info
//@route GET /api/users/current
//@access private

const currentUserInfo = asyncHandler(async (req, res) => {
  const user_info = await User_info.findOne({ user_id: req.user.id });

  if (!user_info) {
    res
      .status(204)
      .json({ message: "User Info Doesn't Exists Create a New Info" });
  } else {
    res.status(200).json({
      user_info: {
        name: `${user_info.first_name} ${user_info.lastname}`,
        dob: user_info.dob,
        profession: user_info.profession,
        interests: user_info.interests,
        about: user_info.about,
      },
    });
  }
});

module.exports = { createUpdateArticleCategory, getAllArticleCategories };
