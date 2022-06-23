const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
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
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 50,
    required: [true, "A user must have a password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function () {
        return this.password === this.passwordConfirm;
      },
      message: "Password Confirm  must match to password",
    },
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
    default: "student",
    enum: ["admin", "manager", "student"],
    required: true,
  },
  phoneNumber: {
    type: String,
    // required: true,
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
    // default: null,
    required: [
      function () {
        return this.role === "student";
      },
      "A student must have an id card number",
    ],
    // unique: [
    //   function () {
    //     return this.role === "student";
    //   },
    //   "An id card number must be unique",
    // ],
    validate: {
      validator: async function (val) {
        if (this.role === "student") {
          const count = await mongoose.models.User.countDocuments({
            id_card_number: val,
          });
          return !count;
        }
      },
      message: "An id card number already exists",
    },
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  // reported_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "ReportForm" }],
  // registration_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  // },
  building_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
  },
});
// Encrypt password
userSchema.pre("save", async function encryptPassword(next) {
  // neu nhu chinh sua lai cac truong khong phai la password
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// compare password when login
userSchema.methods.comparePassword = async function (currentPassword) {
  return await bcrypt.compare(currentPassword, this.password);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
