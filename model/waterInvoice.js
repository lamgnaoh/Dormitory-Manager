const mongoose = require("mongoose");
const Room = require("./rooms");
const User = require("./users");

const waterInvoiceScheam = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "a electricity invoice must have room id"],
  },
  description: {
    type: String,
  },
  unit_price: {
    type: Number,
    require: [true, "a electricity invoice must have unit price"],
  },
  old_index: {
    type: Number,
    required: [true, "a electric invoice must have new index"],
  },
  new_index: {
    type: Number,
    require: [true, "a electric invoice must have new index"],
  },
  start_from: {
    type: Date,
    require: [true, "a electric invoice must have start date"],
  },
  end_to: {
    type: Date,
    require: [true, "a electric invoice must have end date"],
  },
  status: {
    type: String,
    enum: ["paid", "unpaid"],
  },
  // Lưu id của người thanh toán
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const WaterInvoice = mongoose.model("WaterInvoice", waterInvoiceScheam);
module.exports = WaterInvoice;
