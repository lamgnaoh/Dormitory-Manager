const mongoose = require("mongoose");
const User = require("./users");
const Room = require("./rooms");
const reportFormSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["damage", "security ", "sanitation"],
  },
  level: {
    type: String,
    enum: ["urgent", "not urgent"],
  },
  description: {
    type: String,
    require: [true, " A report must have descriptiton "],
  },
  time_report: {
    type: Date,
    default: Date.now(),
    require: [true, " A report must have time report"],
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
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
});
const ReportForm = mongoose.model("ReportForm", reportFormSchema);
module.exports = ReportForm;
