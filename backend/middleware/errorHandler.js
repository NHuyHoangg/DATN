export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Google API errors
  if (err.message?.includes('Invalid credentials')) {
    return res.status(401).json({
      error: 'Authentication failed',
      message: 'Invalid Google API credentials'
    });
  }

  if (err.message?.includes('Requested entity was not found')) {
    return res.status(404).json({
      error: 'Not found',
      message: 'The requested resource was not found'
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      message: err.message,
      details: err.details || null
    });
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    error: statusCode >= 500 ? 'Internal server error' : 'Bad request',
    message: process.env.NODE_ENV === 'development' ? message : 'Something went wrong'
  });
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};