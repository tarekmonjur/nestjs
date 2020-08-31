import { Module } from '@nestjs/common';
import { HttpExceptionFilter, AllExceptionFilter,} from '@common/exceptions';
import { HttpResponseInterceptor,} from '@common/interceptors';

@Module({
  providers: [
    HttpExceptionFilter,
    AllExceptionFilter,
    HttpResponseInterceptor
  ],
  exports: [
    HttpExceptionFilter,
    AllExceptionFilter,
    HttpResponseInterceptor
  ]
})
export class CommonModule {}
