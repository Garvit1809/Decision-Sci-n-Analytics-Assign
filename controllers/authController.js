const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // console.log("Generated JWT Token :- " + token);
  const cookieOptions = {
    expires: new Date(Date.now() + 172800000),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user
  });
};


exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({
        status: error,
        message: 'Please provide email and password!'
      })
    }
    
    const user = await User.findOne({ email }).select("+password");
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: error,
        message: 'Incorrect email or password'
      })
    }
  
    createSendToken(user, 200, res);
  });

  exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    if (!token) {
      res.status(401).json({
        status: 'error',
        message: 'You are not logged in! Please log in to get access.",'
      })
    }
  
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      res.status(401).json({
        status: fail,
        message: 'The user belonging to this token does no longer exist'
      })
    }
  
    req.user = currentUser;
    // console.log(currentUser);
    next();
  });