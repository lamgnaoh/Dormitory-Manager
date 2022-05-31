const mongoose = require("mongoose");
const Room = require("./rooms");
const Building = require("./buildings");
const ReportForm = require("./reportForm");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "A user must have a full name "],
  },
  email: {
    type: String,
    required: [true, "A user must have a email "],
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: [true, "A user must have a password"],
  },
  photo: {
    type: String,
  },
  // status: {
  //   type: String,
  //   enum: ["authenticated", "not authenticated"],
  // },
  role: {
    type: String,
    enum: ["admin", "manager", "student"],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  institute: {
    type: String,
    enum: ["CNTT-TT", "CK", "CK-DL", "CNSH-CNTP", "DM", "KTQL", "DK-TDH"],
  },
  class: {
    type: String,
  },
  schoolYear: {
    type: String,
  },
  id_card_number: {
    type: Number,
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  reported_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "ReportForm" }],
  registration_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  building_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
