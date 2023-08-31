const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/", require("./routes/baseRoute"));

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});