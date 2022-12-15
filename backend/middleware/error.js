const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongoose Object ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // mongoose duplicate key error
  if (err.code === 'E11000') {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong json web token
  if (err.name === "JsonWebTokenError") {
    const message = "Json web tokent is invalid try again";
    err = new ErrorHandler(message, 400);
  }

  //  json web token expired
  if (err.name === "TokenExpiredError") {
    const message = `Resource not found. Expired: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
