import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileLoggerMiddleware implements NestMiddleware {
  private logFile = path.join(process.cwd(), 'logs', 'request.log');

  constructor() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  use(req: Request, res: Response, next: NextFunction): void {
    const timestamp = new Date().toISOString();
    const start = Date.now();
    
    // Capture response
    const originalSend = res.send;
    let responseBody: any;

    res.send = function(body) {
      responseBody = body;
      return originalSend.call(this, body);
    };

    res.on('finish', () => {
      const duration = Date.now() - start;
      
      const logEntry = {
        timestamp,
        duration: `${duration}ms`,
        request: {
          method: req.method,
          url: req.originalUrl,
          headers: req.headers,
          query: req.query,
          body: req.body,
          ip: req.ip
        },
        response: {
          statusCode: res.statusCode,
          headers: res.getHeaders(),
          body: responseBody
        }
      };

      const logLine = JSON.stringify(logEntry) + '\n';
      fs.appendFileSync(this.logFile, logLine);
    });

    next();
  }
}
