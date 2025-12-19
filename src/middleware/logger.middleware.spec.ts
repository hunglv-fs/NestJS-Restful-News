import { LoggerMiddleware } from './logger.middleware';
import { Request, Response, NextFunction } from 'express';

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    middleware = new LoggerMiddleware();
    mockRequest = {
      method: 'GET',
      originalUrl: '/api/v1/news',
      get: jest.fn().mockReturnValue('test-agent')
    };
    mockResponse = {
      on: jest.fn(),
      statusCode: 200,
      get: jest.fn().mockReturnValue('100')
    };
    nextFunction = jest.fn();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should call next function', () => {
    middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should set up response listener', () => {
    middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockResponse.on).toHaveBeenCalledWith('finish', expect.any(Function));
  });
});