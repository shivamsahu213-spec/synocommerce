import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from '../src/modules/auth/routes';
import { AppError } from '../src/common/errors';

export function createAuthTestApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  // Mount auth module routes at /api/auth
  app.use('/api/auth', authRoutes);

  // Central Error Handler
  app.use((err: any, _req: Request, res: Response) => {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        success: false,
        error: {
          code: err.name.toUpperCase(),
          message: err.message,
        },
      });
      return;
    }

    if (err.name === 'ZodError') {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input payload',
          details: err.errors,
        },
      });
      return;
    }

    console.error('Unhandled test server error:', err);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message || 'An unexpected error occurred',
      },
    });
  });

  return app;
}
