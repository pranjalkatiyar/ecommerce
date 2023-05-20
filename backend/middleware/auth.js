const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../modals/userModals");

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // console.log("REDQ",req.headers);
  const token= req.headers.cookies;
  console.log("token",token);
 
  if (!token) {
    console.log("executing this");
    return res.status(401).json({
      success: false,
      message: "Login first to access this resource",
      });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
   req.user = await User.findById(decodedData.id);
  

  next();
});

const authorisedRoles = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    console.log(req.user);
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { isAuthenticatedUser, authorisedRoles };
