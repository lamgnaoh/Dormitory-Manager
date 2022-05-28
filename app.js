const express = require("express");
const morgan = require("morgan");
const userRouter = require("./route/userRoute");
const app = express();

// middleware
app.use(morgan("dev"));

// api
app.use("/api/v1/users", userRouter);

module.exports = app;
