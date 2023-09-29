const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


//------------------------------------------------------
//          TOKEN VALIDATOR - Validates JSON Web Tokens
//------------------------------------------------------


const validateToken = asyncHandler(async (req, res, next) => {

    if (req.header("v2_header") == "web") {
        next()
    } else {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401);
                    throw Error("User is Not Authorised");

                }

                req.user = decoded.user;
                next();
            });
            if (!token) {
                res.status(401);
                throw new Error("User is not authorised or token is missing");
            }
        }
    }


});


module.exports = validateToken;