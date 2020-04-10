const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @route     POST /api/auth/register
// @desc      Register a user
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token
  });
});

// @route     POST /api/auth/login
// @desc      login a user
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check for email and password
  if(!email || !password) {
    return next(
      new ErrorResponse(400, 'Please add an email and password')
    )
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if(!user) {
    return next(new ErrorResponse(401, 'Invalid credentials'));
  }

  const isMatch = await user.matchPassword(password);

  if(!isMatch) {
    return next(new ErrorResponse(401, 'Invalid credentials'));
  }

  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token
  });
});
