const mongoose = require("mongoose");
const User = require("./users");
const Room = require("./rooms");
const registrationFormSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    require: [true, " A form registration  must have time request"],
  },
  time_request: {
    type: Date,
    default: Date.now(),
    require: [true, " A form registration must have time request"],
  },
  time_accept: {
    type: Date,
    default: null,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "reject"],
    default: "pending",
  },
  user: {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    id_card: {
      type: Number,
    },
  },
});
const RegistrationForm = mongoose.model(
  "RegistrationForm",
  registrationFormSchema
);
module.exports = RegistrationForm;
