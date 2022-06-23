const express = require("express");
const authController = require("../controller/authController");
const registrationController = require("../controller/registrationController");

const router = express.Router();

router
  .route("/registerRoom/:id")
  .post(
    authController.userAuth,
    authController.restrictTo("student"),
    registrationController.registerRoom
  );
router
  .route("/acceptRequest/:id")
  .patch(
    authController.userAuth,
    authController.restrictTo("admin", "manager"),
    registrationController.acceptRequest
  );
module.exports = router;
