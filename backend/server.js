const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require("./middleware/errorMiddleware")
const colors = require('colors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/errands', require("./routes/errandsRoute.js"));
app.use('/api/users', require("./routes/userRoute.js"));
app.use('/api/confirmations', require("./routes/confirmationRoute.js"))

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));