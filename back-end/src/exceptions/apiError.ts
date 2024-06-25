import { logger } from '../logger';

class ApiError extends Error {
  status: number;
  errors: string[];

  constructor(status: number, message?: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(message?: string) {
    logger.warn(JSON.stringify([401, message || 'Not authorized']));
    return new ApiError(401, message || 'Not authorized');
  }

  static MethodNotAllowed(message?: string) {
    logger.warn(JSON.stringify([405, message]));
    return new ApiError(405, message);
  }

  static AlreadyExists(message?: string) {
    logger.warn(JSON.stringify([409, message]));
    return new ApiError(409, message);
  }

  static BadRequest(message?: string, errors = []) {
    logger.warn(JSON.stringify([400, message, errors]));
    return new ApiError(400, message, errors);
  }

  static NotFound(message?: string) {
    logger.warn(JSON.stringify([404, message]));
    return new ApiError(404, message);
  }
}

export default ApiError;
