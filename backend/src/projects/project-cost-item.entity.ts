import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class ProjectCostItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (p) => p.costItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: number;

  @Column({ nullable: true })
  item: string;

  @Column({ type: 'float', default: 0 })
  unitPrice: number;

  @Column({ type: 'float', default: 0 })
  qty: number;

  @Column({ type: 'float', default: 0 })
  totalPrice: number;
}
