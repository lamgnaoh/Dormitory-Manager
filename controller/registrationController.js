const RegistrationForm = require("../model/registrationForm");
const Room = require("../model/rooms");
const User = require("../model/users");
const AppError = require("../utils/appError");

// student register room
exports.registerRoom = async (req, res, next) => {
  try {
    const form = await RegistrationForm.create({
      room_id: req.params.id,
      time_request: Date.now(),
      user: {
        user_id: req.user._id,
        name: req.user.fullName,
        id_card: req.user.id_card_number,
      },
    });
    const user = await User.findById(req.user._id);
    user.registration_id = form._id;
    await user.save({ validateBeforeSave: false });
    res.status(201).json({
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
    const requestForm = await RegistrationForm.findById(req.params.id);
    if (!requestForm) {
      return next(new AppError("No request form found with that id ", 404));
    }

    const requestRoom = await Room.findById(requestForm.room_id);
    if (!requestRoom) {
      return next(new AppError("No room  found with that id ", 404));
    }

    if (requestRoom.maxNumberOfPeople > requestRoom.currentNumberOfPeople) {
      // cap nhat lai so luong nguoi cua phong
      requestRoom.currentNumberOfPeople += 1;
      await requestRoom.save({ validateBeforeSave: true });
    } else {
      return next(
        new AppError(
          "Room full of people already. Please choose another room",
          400
        )
      );
    }
    // cap nhat lai room_id cua user
    const requestUser = await User.findById(requestForm.user.user_id);
    if (!requestUser) {
      return next(new AppError("No user id has found", 404));
    }
    requestUser.room_id = requestRoom._id;
    await requestUser.save({ validateBeforeSave: false });

    // chinh sua ngay accept va status cua register form
    requestForm.time_accept = Date.now();
    requestForm.status = "accepted";
    await requestForm.save({ validateBeforeSave: true });
    res.status(200).json({
      status: "success",
      data: {
        requestForm,
      },
    });
  } catch (err) {
    next(err);
  }
};

// admin , manager reject registration form
