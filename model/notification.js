const mongoose = require("mongoose");
const Building = require("./buildings");
const NotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["public", "private"],
  },
  building_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});
const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
