import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkOrdersDto } from './work-orders.dto';
import { WorkOrders } from './work-orders.entity';

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectRepository(WorkOrders) private woRepository: Repository<WorkOrders>
  ) {}

  async createWorkOrder(workorder: WorkOrdersDto): Promise<WorkOrdersDto> {
      return await this.woRepository.save(workorder);
  }

  async getAllWorkOrder(): Promise<WorkOrdersDto[]> {
    return await this.woRepository.find();
  }

  async getWorkOrder(id: number): Promise<WorkOrdersDto> {
    return this.woRepository.findOne(id);
  }

  async updateWorkOrder(id: number, workorder: WorkOrdersDto): Promise<any> {
    await this.woRepository.update(id, workorder);
    return await this.woRepository.findOne(id);
  }

  async deleteWorkOrder(id: number) {
    await this.woRepository.delete(id);
    return {deleted: true}
  }
}
