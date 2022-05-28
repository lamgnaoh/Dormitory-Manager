const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({
  path: `${__dirname}/config.env`,
});
const port = process.env.PORT || 8000;
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
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
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
