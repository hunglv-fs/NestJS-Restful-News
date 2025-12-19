import { RateLimitMiddleware } from './rate-limit.middleware';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

describe('RateLimitMiddleware', () => {
  let middleware: RateLimitMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    middleware = new RateLimitMiddleware();
    mockRequest = {
      ip: '127.0.0.1'
    } as any;
    mockResponse = {};
    nextFunction = jest.fn();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should allow first request', () => {
    middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should track request count', () => {
    for (let i = 0; i < 5; i++) {
      middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    }
    expect(nextFunction).toHaveBeenCalledTimes(5);
  });

  it('should throw error when limit exceeded', () => {
    // Simulate 101 requests
    for (let i = 0; i < 100; i++) {
      middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    }
    
    expect(() => {
      middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    }).toThrow(new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS));
  });
});