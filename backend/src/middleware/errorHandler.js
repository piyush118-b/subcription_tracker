function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Supabase error
  if (err.code) {
    return res.status(400).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
  }

  // Validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        message: err.message,
        code: 'VALIDATION_ERROR',
      },
    });
  }

  // Default server error
  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
}

module.exports = errorHandler;
