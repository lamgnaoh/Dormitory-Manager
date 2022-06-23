const Room = require("../model/rooms");
const Building = require("../model/buildings");
const APIFeature = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
// get all room
exports.getAllRoom = async (req, res, next) => {
  try {
    // Execute query
    const features = new APIFeature(Room.find(), req.query)
      .filter()
      .sort()
      .field()
      .pagination();
    const rooms = await features.query;
    res.status(200).json({
      status: "success",
      result: rooms.length,
      data: {
        rooms,
      },
    });
  } catch (err) {
    next(err);
  }
};
// student get rooms

// get room by id
exports.getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return next(new AppError("No room found with that id", 404));
    res.status(200).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (err) {
    next(err);
  }
};
// student get room
exports.getAvailableRoom = async (req, res, next) => {
  try {
    const buildingsQuery = await Building.find({
      gender: req.user.gender,
    });
    const buildings = [];
    buildingsQuery.forEach((building) => {
      buildings.push(building.name);
    });
    // chi query nhung phong co so nguoi dang o it hon max
    const rooms = await Room.find({
      building: { $in: buildings },
      $expr: {
        $gt: ["$maxNumberOfPeople", "$currentNumberOfPeople"],
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        rooms,
      },
    });
  } catch (err) {
    next(err);
  }
};

// create room
exports.createRoom = async (req, res, next) => {
  try {
    const newRoom = await Room.create(req.body);
    // http status code 201: created
    res.status(201).json({
      status: "success",
      data: {
        room: newRoom,
      },
    });
  } catch (err) {
    next(err);
  }
};
// update room
exports.updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateRoom) {
      return next(new AppError("No room found with that id", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        room: updateRoom,
      },
    });
  } catch (err) {
    next(err);
  }
};
// delete room
exports.deleteRoom = async (req, res, next) => {
  try {
    const deleteRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deleteRoom) {
      return next(new AppError("No Room found with that id ", 404));
    }
    // http 204: success and no content
    res.status(204).json({
      status: "success",
      data: {
        room: deleteRoom,
      },
    });
  } catch (err) {
    next(err);
  }
};
