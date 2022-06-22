const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

// Uncaught Exceptions

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception !!! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({
  path: `${__dirname}/config.env`,
});
const port = process.env.PORT || 8000;
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
// console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log("Connect to database successfully");
  });
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// unhandle rejection
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection !!! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
