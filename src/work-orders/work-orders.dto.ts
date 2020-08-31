import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export enum status {
  DRAFT = "draft",
  PUBLISH = "publish",
  ASSIGN = "assign",
  APPROVED = "assigned",
}

export class WorkOrdersDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  type_of_work: string;

  description: string;

  @IsOptional()
  @IsEnum(status)
  status: status
}