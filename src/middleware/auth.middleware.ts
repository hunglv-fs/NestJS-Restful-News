import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    
    // Skip auth for public endpoints
    if (req.path.includes('/api/v1/news') && req.method === 'GET') {
      next();
      return;
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization header');
    }

    const token = authHeader.substring(7);
    
    // Simple token validation (replace with JWT validation in production)
    if (token !== 'valid-token') {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}