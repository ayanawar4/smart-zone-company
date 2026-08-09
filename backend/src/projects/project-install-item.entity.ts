import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class ProjectInstallItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (p) => p.installItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: number;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'float', default: 0 })
  unitPrice: number;

  @Column({ type: 'float', default: 0 })
  qty: number;

  @Column({ type: 'float', default: 0 })
  totalPrice: number;
}
