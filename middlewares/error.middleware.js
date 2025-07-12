const errorHandler = (err, req, res, next) => {
  // Set default status code and message
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Handle Mongoose bad ObjectId
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Resource not found. Invalid: ${err.path}`;
  }

  // Handle duplicate key errors (MongoDB)
  if (err.code && err.code === 11000) {
    statusCode = 409;
    message = `Duplicate field value entered: ${JSON.stringify(err.keyValue)}`;
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: message,
    // Only show stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;
