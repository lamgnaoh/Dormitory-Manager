const jwt = require("jsonwebtoken");
const User = require("../model/users");

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    next(err);
  }
};
// admin create user
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create({
      role: req.body.role,
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      id_card_number: req.body.id_card_number,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};
