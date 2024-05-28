class ApiError extends Error {
  status: number;
  errors: string[];

  constructor(status: number, message?: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(message?: string) {
    return new ApiError(401, message || 'Not authorized');
  }

  static MethodNotAllowed(message?: string) {
    return new ApiError(405, message);
  }

  static AlreadyExists(message?: string) {
    return new ApiError(409, message);
  }

  static BadRequest(message?: string, errors = []) {
    return new ApiError(400, message, errors);
  }
}

export default ApiError;
