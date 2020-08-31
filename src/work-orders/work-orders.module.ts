import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/exceptions';
import { HttpResponseInterceptor } from '@common/interceptors';
import { WorkOrdersController } from './work-orders.controller';
import { WorkOrdersService } from './work-orders.service';
import { WorkOrders } from './work-orders.entity';


@Module({
  imports: [TypeOrmModule.forFeature([WorkOrders])],
  controllers: [WorkOrdersController],
  providers: [
    WorkOrdersService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpResponseInterceptor ,
    },
  ]
})
export class WorkOrdersModule {}
