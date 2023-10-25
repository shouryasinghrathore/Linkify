const express = require('express');
const app = express();
const urlRoute = require('./routes/routes');
const { dbConnect } = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

dbConnect();
app.use(express.json());

app.use(urlRoute)

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})



