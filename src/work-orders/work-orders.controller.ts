import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  ValidationPipe, UsePipes,
} from '@nestjs/common';
import { WorkOrdersDto } from './work-orders.dto';
import { WorkOrdersService } from './work-orders.service';

@Controller('work-orders')
export class WorkOrdersController {
  constructor(private workordersService: WorkOrdersService) {}

  @Get()
  async index(): Promise<WorkOrdersDto[]> {
    return await this.workordersService.getAllWorkOrder();
  }

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  @HttpCode(200)
  async store(@Body() payload: WorkOrdersDto): Promise<WorkOrdersDto> {
    return await this.workordersService.createWorkOrder(payload);
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number): Promise<WorkOrdersDto> {
    const workorder = await this.workordersService.getWorkOrder(id);
    if (!workorder) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return workorder;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: WorkOrdersDto): Promise<WorkOrdersDto> {
    const workorder = await this.workordersService.getWorkOrder(id);
    if (!workorder) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return await this.workordersService.updateWorkOrder(id, payload);
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number) {
    const workorder = await this.workordersService.getWorkOrder(id);
    if (!workorder) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return await this.workordersService.deleteWorkOrder(id);
  }
}
