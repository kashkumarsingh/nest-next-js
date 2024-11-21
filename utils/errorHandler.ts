// utils/errorHandler.ts
import { NextApiResponse } from 'next';

export const errorHandler = (res: NextApiResponse, error: unknown, statusCode = 500) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', error); // Detailed error logging in development mode
  }
  res.status(statusCode).json({
    success: false,
    error: (statusCode === 500 && process.env.NODE_ENV === 'development') ? error : 'Internal Server Error',
  });
};
