class AppError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
function fail(status, code, message) {
  throw new AppError(status, code, message);
}
function normalize(error) {
  if (error instanceof AppError) return error;
  if (error.code === 11000)
    return new AppError(
      409,
      'DUPLICATE',
      'This asset code already exists, or the equipment already has an active loan.',
    );
  if (error.name === 'ValidationError' || error.name === 'CastError')
    return new AppError(
      400,
      'INVALID_INPUT',
      'Invalid input fields or record ID.',
    );
  return new AppError(
    500,
    'INTERNAL_ERROR',
    'The operation could not be completed. Please try again.',
  );
}
module.exports = { AppError, fail, normalize };
