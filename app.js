const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/userRoutes')
const eventRouter = require('./routes/eventRoutes')

const globalErrorHandler = require('./controllers/errorController')

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.use('/api/auth', userRouter);
app.use('/api/events', eventRouter)

app.use(globalErrorHandler)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is running on PORT:- " + PORT);
})

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
})