const express = require("express");
const User = require("../model/users");
const userController = require("../controller/userController");
const router = express.Router();

// get all user info
router.get("/", userController.getAllUser);

module.exports = router;
