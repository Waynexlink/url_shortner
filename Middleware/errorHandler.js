const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};

module.exports = errorHandler;
