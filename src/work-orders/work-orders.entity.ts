
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {status} from './work-orders.dto';

@Entity()
export class WorkOrders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type_of_work: string;

  @Column({type: 'text', nullable: true})
  description: string;

  @Column({type: 'enum', enum: status, default: status.DRAFT})
  status: status;

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  create_at: string

}