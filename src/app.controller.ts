import {
  Controller,
  Get, Post, Put, Req, Res, Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  HttpException,
  BadRequestException
} from '@nestjs/common';
import { Request, Response} from 'express';
import { AppService } from './app.service';

// class postDto {
//   title: string;
//   type_of_work: {[key: string]: any}
// }

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post() // default status code 201
  @HttpCode(200)
  postHello(@Req() req: Request): any {
    const payload = req.body;
    return payload;
  }

  // @Post() // default status code 201
  // @HttpCode(200)
  // postHello(@Body() payload: postDto): any {
  //   return payload.title;
  // }

  @Put()
  putHello(@Res() res: Response): Response {
    const content = this.appService.getHello();
    return res.status(202).send(content);
  }

  @Delete(':id')
  deleteHello(@Param('id') id): number {
    if (typeof id === 'number') {
      return id;
    }
    throw new HttpException('invalid input', HttpStatus.FORBIDDEN);
    // throw new BadRequestException();
  }
}
