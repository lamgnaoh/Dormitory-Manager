const express = require("express");
const User = require("../model/users");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const router = express.Router();

// login
router.post("/signup", authController.signup);
router.post("/signin", authController.login);
// get all user info
router.route("/").get(userController.getAllUser);

module.exports = router;
