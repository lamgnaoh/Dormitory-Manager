const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Room = require("../model/rooms");
dotenv.config({
  path: `${__dirname}/../config.env`,
});
const DB_URL = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connect to database successfully");
  });
const rooms = JSON.parse(fs.readFileSync(`${__dirname}/room.json`, "utf8"));
// console.log(rooms);
const importData = async () => {
  try {
    await Room.create(rooms);
    console.log("data successfully import");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    await Room.deleteMany();
    console.log("data successfully delete");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
