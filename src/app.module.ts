import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from '@app/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkOrdersModule } from './work-orders/work-orders.module';
import { CommonModule } from '@common/common.module';
import * as fs from 'fs';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from '@common/exceptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        fs.writeFileSync('./ormconfig.json', JSON.stringify(dbConfig), {encoding: 'utf8'});
        return dbConfig
      },
      inject: [ConfigService],
    }),
    WorkOrdersModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    }
  ],
})
export class AppModule {

}
