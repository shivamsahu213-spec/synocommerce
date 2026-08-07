import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import productRoutes from '../src/modules/products/routes';
import { AppError } from '../src/common/errors';

export function createProductTestApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  // Mount product module routes at /api
  app.use('/api', productRoutes);

  // Central Error Handler (Express requires 4 arguments for error middleware)
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
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

    console.error('Unhandled product test server error:', err);
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
