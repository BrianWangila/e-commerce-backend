const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/error')
app.use(express.json());
app.use(cookieParser());

//routes
const productsRoute = require('./routes/productRoute');
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
app.use('/api/', productsRoute);
app.use('/api/', orderRoute);
app.use("/api", orderRoute);



//middleware for error
app.use(errorMiddleware);
module.exports = app;