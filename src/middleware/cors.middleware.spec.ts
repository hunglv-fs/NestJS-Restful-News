import { CorsMiddleware } from './cors.middleware';
import { Request, Response, NextFunction } from 'express';

describe('CorsMiddleware', () => {
  let middleware: CorsMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    middleware = new CorsMiddleware();
    mockRequest = {};
    mockResponse = {
      header: jest.fn(),
      sendStatus: jest.fn()
    };
    nextFunction = jest.fn();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should set CORS headers', () => {
    mockRequest.method = 'GET';
    middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    
    expect(mockResponse.header).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
    expect(mockResponse.header).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should handle OPTIONS request', () => {
    mockRequest.method = 'OPTIONS';
    middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
    
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
    expect(nextFunction).not.toHaveBeenCalled();
  });
});