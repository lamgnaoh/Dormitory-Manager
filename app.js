const express = require("express");
const morgan = require("morgan");
const userRouter = require("./route/userRoute");
const roomRouter = require("./route/roomRoute");
const globalErrorHandler = require("./controller/errorController");
const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());

// api
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);

// global error handler
app.use(globalErrorHandler);

module.exports = app;
