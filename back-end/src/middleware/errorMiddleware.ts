import ApiError from '../exceptions/apiError';

const errorMiddleware = (err: any, req: any, res: any, _next: any) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};

export default errorMiddleware;
