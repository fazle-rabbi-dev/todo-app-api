const express = require("express");
const app = express();
require("dotenv").config();
require("./database/db");
const v1UserRouter = require("./routes/v1/userRoutes");
const v1TodoRouter = require("./routes/v1/todoRoutes");
const notFoundErrorHandler = require("./middlewares/notFoundErrorHandler");
const otherErrorHandler = require("./middlewares/otherErrorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", v1UserRouter);
app.use("/api/v1/todos", v1TodoRouter);
app.use('*', notFoundErrorHandler);
app.use(otherErrorHandler)

module.exports = app;
