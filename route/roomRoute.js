const express = require("express");
const roomController = require("../controller/roomController");
const Router = express.Router();

Router.route("/")
  .get(roomController.getAllRoom)
  .post(roomController.createRoom);
Router.route("/:id")
  .patch(roomController.updateRoom)
  .delete(roomController.deleteRoom);
module.exports = Router;
