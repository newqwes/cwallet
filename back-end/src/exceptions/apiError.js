class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(message) {
    return new ApiError(401, message || 'Not authorized');
  }

  static MethodNotAllowed(message) {
    return new ApiError(405, message);
  }

  static AlreadyExists(message) {
    return new ApiError(409, message);
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}

export default ApiError;
