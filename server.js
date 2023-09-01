const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require("./middleware/errorHandler")

const connect_Db = require("./db_config/db_connection");


connect_Db();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/", require("./routes/baseRoute"));
app.use("/api/users/", require("./routes/userRoutes"));
app.use("/api/users/user-info", require("./routes/userInfoRoutes"));

app.use("/api/articles", require("./routes/articlesRoute"));

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});