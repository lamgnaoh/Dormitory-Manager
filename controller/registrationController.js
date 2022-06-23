const RegistrationForm = require("../model/registrationForm");
const AppError = require("../utils/appError");

// student register room
exports.registerRoom = async (req, res, next) => {
  try {
    const form = await RegistrationForm.create({
      room_id: req.params.id,
      time_request: Date.now(),
      time_accept: null,
      status: "pending",
      user: {
        user_id: req.user._id,
        name: req.user.fullName,
        id_card: req.user.id_card_number,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        form,
      },
    });
  } catch (err) {
    next(err);
  }
};

// admin , manager accept register room
exports.acceptRequest = async (req, res, next) => {
  try {
    // chinh sua ngay accept va status cua register form
    const request = await RegistrationForm.findById(req.params.id);
    console.log(request);
    // cap nhat lai so luong nguoi cua phong
    // cap nhat lai room_id cua user
  } catch (err) {
    next(err);
  }
};
