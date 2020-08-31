import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const ctx = context.switchToHttp();
    const method = ctx.getRequest().method;
    const controller = context.getClass().name;
    const handler = context.getHandler().name;
    const type = context.getType();
    const now = Date.now();

    const status = ctx.getResponse().status;
    const statusCode = ctx.getResponse().statusCode;
    const message = ctx.getResponse().statusMessage;

    return next
      .handle()
      .pipe(
        map((data) => {
          return {
            statusCode: statusCode || HttpStatus.OK,
            message: message || status,
            result: data
          }
        }),
        tap(() => Logger.log(
          JSON.stringify({
            type,
            method,
            controller,
            handler,
            status,
            statusCode,
            message,
            time: `${Date.now() - now}ms`
          }),
          'HttpResponseInterceptor')
        ),
      );
  }
}