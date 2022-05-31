const mongoose = require("mongoose");
const User = require("./users");

const buildingSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "A building must have name "],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    require: [true, "A building must have gender for student "],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  numberOfRoom: {
    type: Number,
  },
  manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Building = mongoose.model("Building", buildingSchema);
module.exports = Building;
