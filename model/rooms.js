const mongoose = require("mongoose");
const Building = require("./buildings");
const User = require("./users");

function getPrice(num) {
  return (num / 1000).valueOf();
}
function setPrice(num) {
  return num * 1000;
}
const roomSchema = new mongoose.Schema({
  // đối tượng có thể được đăng kí  phòng
  // gender: {
  //   type: String,
  //   enum: ["male", "female"],
  // },
  schoolYear: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  room_number: {
    type: Number,
    require: [true, " A room must have a room number"],
  },
  building: {
    type: String,
    require: [true, " A room must have in a building "],
  },
  maxNumberOfPeople: {
    type: Number,
    enum: [4, 6, 8],
    default: 8,
    require: [true, " A room must have max number of people"],
  },
  currentNumberOfPeople: {
    type: Number,
    require: [true, " A room must have current number of people"],
    default: 0,
    validate: {
      validator: function () {
        return this.currentNumberOfPeople <= this.maxNumberOfPeople;
      },
      message:
        "Current number of people must be less than or equal to max number of people",
    },
  },
  rentMoney: {
    type: Number,
    require: [true, " A room must have rent money"],
    get: getPrice,
    set: setPrice,
  },
  manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  //   user_id: [mongoose.Schema.Types.ObjectId],
});
// roomSchema.methods.comparePeople = function () {
//   return this.currentNumberOfPeople <= this.maxNumberOfPeople;
// };
const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
