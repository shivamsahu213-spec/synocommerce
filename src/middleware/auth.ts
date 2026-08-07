// src/middleware/auth.ts
/**
 * Authentication middleware for Next.js API routes.
 * Extracts JWT from the `Authorization` header (Bearer <token>)
 * validates it, and populates the request context with tenantId, userId,
 * roles and permissions.
 *
 * This implementation uses `jsonwebtoken` – make sure the package is installed.
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { runWithContext, RequestContext } from '../context/requestContext';

// Secret / public key for JWT verification – read from env.
const JWT_SECRET = process.env.JWT_SECRET ?? '';

/**
 * Verify JWT and return its payload. Throws on invalid token.
 */
function verifyToken(token: string): any {
  if (!JWT_SECRET) throw new Error('JWT secret not configured');
  return jwt.verify(token, JWT_SECRET);
}

/**
 * Middleware wrapper used in API route handlers.
 * Example usage:
 *   export default withAuth(async (req, res) => { ... });
 */
export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing Authorization header' });
      return;
    }
    const token = authHeader.slice(7).trim();
    let payload: any;
    try {
      payload = verifyToken(token);
    } catch {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    const ctx: RequestContext = {
      requestId: req.headers['x-request-id'] as string || crypto.randomUUID(),
      correlationId: req.headers['x-correlation-id'] as string || crypto.randomUUID(),
      tenantId: payload.tenantId,
      userId: payload.sub,
      roles: payload.roles || [],
      permissions: payload.permissions || [],
      locale: payload.locale || 'en-US',
      timezone: payload.timezone || 'UTC',
      currency: payload.currency || 'USD',
      ipAddress: req.socket?.remoteAddress || '',
      userAgent: req.headers['user-agent'] as string || '',
      traceId: payload.traceId,
    };

    await runWithContext(ctx, async () => handler(req, res));
  };
}
