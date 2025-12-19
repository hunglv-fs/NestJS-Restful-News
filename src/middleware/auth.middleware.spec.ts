import { AuthMiddleware } from './auth.middleware';
import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    middleware = new AuthMiddleware();
    mockRequest = {
      headers: {},
      method: 'POST'
    } as any;
    Object.defineProperty(mockRequest, 'path', {
      value: '/api/v1/test',
      writable: true
    });
    mockResponse = {};
    nextFunction = jest.fn();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should allow GET requests to news endpoints', () => {
    Object.defineProperty(mockRequest, 'path', { value: '/api/v1/news', writable: true });
    mockRequest.method = 'GET';
    
    middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should throw error for missing authorization header', () => {
    expect(() => {
      middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    }).toThrow(UnauthorizedException);
  });

  it('should throw error for invalid token format', () => {
    mockRequest.headers = { authorization: 'InvalidFormat' };
    
    expect(() => {
      middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    }).toThrow(UnauthorizedException);
  });

  it('should throw error for invalid token', () => {
    mockRequest.headers = { authorization: 'Bearer invalid-token' };
    
    expect(() => {
      middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    }).toThrow(UnauthorizedException);
  });

  it('should allow valid token', () => {
    mockRequest.headers = { authorization: 'Bearer valid-token' };
    
    middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });
});