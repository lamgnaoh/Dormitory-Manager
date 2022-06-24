const RegistrationForm = require("../model/registrationForm");
const Room = require("../model/rooms");
const User = require("../model/users");
const AppError = require("../utils/appError");

// student register room
exports.registerRoom = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    // neu nhu nguoi dung da dang ki 1 form truoc do va dang o trang thai pending -> khong duoc dang ki
    if (user.registration_id) {
      return next(new AppError("You already have a registration ", 400));
    }
    if (user.room_id) {
      return next(
        new AppError(
          "You already in a room. You must quit the room first to register a room ",
          400
        )
      );
    }
    const form = await RegistrationForm.create({
      room_id: req.params.id,
      time_request: Date.now(),
      user: {
        user_id: req.user._id,
        name: req.user.fullName,
        id_card: req.user.id_card_number,
      },
    });
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
    requestUser.registration_id = undefined;
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
exports.rejectRequest = async (req, res, next) => {
  try {
    const requestForm = await RegistrationForm.findById(req.params.id);
    if (!requestForm) {
      return next(new AppError("No request form found with that id ", 404));
    }
    // chinh sua field registration form id cua user thanh undefined -> user co the dang ki duoc tiep

    const user = await User.findById(requestForm.user.user_id);
    if (!user) {
      return next(new AppError("No user found with that id ", 404));
    }
    user.registration_id = undefined;
    await user.save({ validateBeforeSave: false });

    // request form status tro thanh rejected
    requestForm.status = "rejected";
    requestForm.time_reject = Date.now();
    await requestForm.save();

    res.status(200).json({
      status: "success",
      message: "Request form has been rejected",
    });
  } catch (err) {
    next(err);
  }
};
