import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.getResponse().message || exception.message;
    const error = exception.getResponse().error || exception.error;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message
    };

    Logger.error(error, JSON.stringify(errorResponse), 'AllExceptionFilter');

    response
      .status(status)
      .json(errorResponse);
  }
}