const express = require("express");
const roomController = require("../controller/roomController");
const authController = require("../controller/authController");
const Router = express.Router();

Router.route("/availableRoom").get(
  authController.userAuth,
  roomController.getAvailableRoom
);

Router.route("/")
  .get(
    authController.userAuth,
    authController.restrictTo("admin", "manager"),
    roomController.getAllRoom
  )
  .post(
    authController.userAuth,
    authController.restrictTo("admin", "manager"),
    roomController.createRoom
  );
Router.route("/:id")
  .get(roomController.getRoomById)
  .patch(authController.userAuth, roomController.updateRoom)
  .delete(authController.userAuth, roomController.deleteRoom);
module.exports = Router;
