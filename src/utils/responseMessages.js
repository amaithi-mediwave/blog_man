

//------------------------------------------------------
//          RESPONSE MESSAGES
//------------------------------------------------------



const messages = {
    user: {
        mes_1: { statuscode: 400, message: "User already Registered"},
        mes_2: { statuscode: 400, message: "User data is not valid"},
        mes_3: { statuscode: 201, message: "User Created and Logged-in Successfully"},
        mes_4: { statuscode: 201, message: "User Created Successfully"},
        mes_5: { statuscode: 200, message: "Login Successful"},
        mes_6: { statuscode: 401, message: "email is not valid"},
        mes_7: { statuscode: 401, message: "Password is not valid"},
        mes_8: { statuscode: 204, message: "User Info Doesn't Exists Create a New Info"},
    },

    article: {
        mes_1: "Article Not Exists",
        mes_2: "Category Not Exists",
        mes_3: "Unable to Create the Article",
        mes_4: "Article Created Successfully.",
        mes_5: "You don't have permission to update the Article posted by another author",
        mes_6: "Article has been updated",
        mes_7: "Unable to Update the Article Try After Sometime.",
        mes_8: "Article Deleted Successfully.",
        mes_9: "Unable to Delete the Article Try after Sometime.",
        mes_10: "Unable to get the Categories Try after Sometime.",
        mes_11: "The Given Update Category is Already Exists please provide a different Name",
        mes_12: "Unable to Update the Category Try After Sometime.",
        mes_13: "The Given Category is Not Exists please provide a Valid Category Name",
        mes_14: "The Given Category is Already Exists and update category is set to false, please provide a Valid Category Name",

    },

    comment: {
        mes_1: "Enter Your Comment",
        mes_2: "Unable to create the Comment",
        mes_3: "Your Comment is created and published",
        mes_4: "Comment Not Exists",
        mes_5: "You don't have permission to update the Comment posted by another User",
        mes_6: "Unable to update the Comment",
        mes_7: "Comment has been updated",
        mes_8: "Unable to Delete the Comment",
        mes_9: "Comment Deleted Successfully",
        mes_10: "You don't have permission to Delete the Comment posted by another User",

    }

    
   
    
}

module.exports = { messages }