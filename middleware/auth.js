const jwt = require('jsonwebtoken');
const asyncHandler = require('./asynchandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token) {
    return next(
      new ErrorResponse(401, 'You can Not access this route')
    )
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if(!user) {
      return next(new ErrorResponse(401, 'Not allowed to acces this route'))
    }

    req.user = user

    next();
  } catch (err) {
     return next(
      new ErrorResponse(401, 'you cant access this route')
    )
  }
});