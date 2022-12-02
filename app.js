const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is running on PORT:- " + PORT);
})

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
})