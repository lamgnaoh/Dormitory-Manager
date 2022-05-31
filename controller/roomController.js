const Tour = require("../model/rooms");
const APIFeature = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
exports.getAllRoom = async (req, res, next) => {
  try {
    // Execute query
    const features = new APIFeature(Tour.find(), req.query)
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
// create room
exports.createRoom = async (req, res, next) => {
  try {
    const newRoom = await Tour.create(req.body);
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
    const updateRoom = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!updateRoom) {
      return new AppError("No tour found with that id ", 404);
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
    const deleteRoom = await Tour.findByIdAndDelete(req.params.id);
    if (!deleteRoom) {
      return new AppError("No tour found with that id ", 404);
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
