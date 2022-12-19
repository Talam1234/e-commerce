const express = require("express");
const cookies = require("cookie-parser");
const app = express();
app.use(express.json());

app.use(cookies());

//route import
const product  = require("./routes/productroute");
const user  = require("./routes/userroute");
const order  = require("./routes/orderroute");
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

//middleware
const errormiddleware = require("./middleware/error")
app.use(errormiddleware);

module.exports = app;