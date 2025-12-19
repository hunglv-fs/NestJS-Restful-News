import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requests = new Map<string, { count: number; resetTime: number }>();
  private readonly limit = 100; // requests per window
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes

  use(req: Request, res: Response, next: NextFunction): void {
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    
    const clientData = this.requests.get(clientIp);
    
    if (!clientData || now > clientData.resetTime) {
      this.requests.set(clientIp, {
        count: 1,
        resetTime: now + this.windowMs
      });
      next();
      return;
    }

    if (clientData.count >= this.limit) {
      throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
    }

    clientData.count++;
    next();
  }
}