import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse()['message'] || exception.message;
    const error = exception.getResponse()['error'] || exception.message;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: status === HttpStatus.NOT_FOUND ? error : message
    };

    Logger.error(error, JSON.stringify(errorResponse), 'HttpExceptionFilter');

    response
      .status(status)
      .json(errorResponse);
  }
}