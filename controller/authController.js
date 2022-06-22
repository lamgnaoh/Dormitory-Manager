const jwt = require("jsonwebtoken");
const User = require("../model/users");
const AppError = require("../utils/appError");
const generateToken = function (payload) {
  return jwt.sign(payload, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRED,
  });
};
// student sign up
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      id_card_number: req.body.id_card_number,
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: "student",
    });
    // sinh token
    const token = generateToken({ id: newUser._id, role: newUser.role });
    res.status(201).json({
      status: "success",
      token: token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

// student login
exports.login = async (req, res, next) => {
  try {
    // 1 Check if password and email exist in req.body
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    // check if user available in db
    const user = await User.findOne({ email }).select("+password");
    if (user.email !== email || !(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid email or password" });
    }
    // sinh token
    const token = generateToken({ id: user._id, role: user.role });

    res.status(200).json({
      status: "ok",
      token,
    });
  } catch (err) {
    next(err);
  }
};

// authenticate user
exports.userAuth = async (req, res, next) => {
  try {
    // lay token va kiem tra neu token ton tai
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new AppError("You are not login !!! Please login to access", 401)
      );
    }
    // Verification token
    const payload = jwt.verify(token, process.env.JWT_SECRETKEY);
    // neu token valid , kiem tra user con ton tai hay khong
    const currentUser = await User.findById(payload.id);
    if (!currentUser) {
      return next(
        new AppError("User belong to this token does no longer exist", 401)
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

// authorization
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return next(
        new AppError("You do not have permission to access this route.", 403)
      );
    }
    next();
  };
};
