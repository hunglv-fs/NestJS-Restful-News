import { FileLoggerMiddleware } from './file-logger.middleware';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

jest.mock('fs');

describe('FileLoggerMiddleware', () => {
  let middleware: FileLoggerMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.mkdirSync as jest.Mock).mockReturnValue(undefined);
    (fs.appendFileSync as jest.Mock).mockReturnValue(undefined);

    middleware = new FileLoggerMiddleware();
    mockRequest = {
      method: 'GET',
      originalUrl: '/api/v1/news',
      headers: { 'user-agent': 'test' },
      query: {},
      body: {},
      ip: '127.0.0.1'
    };
    mockResponse = {
      send: jest.fn(),
      on: jest.fn(),
      statusCode: 200,
      getHeaders: jest.fn().mockReturnValue({})
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

  it('should create logs directory if not exists', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    new FileLoggerMiddleware();
    expect(fs.mkdirSync).toHaveBeenCalled();
  });
});