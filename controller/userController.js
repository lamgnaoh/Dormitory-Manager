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
