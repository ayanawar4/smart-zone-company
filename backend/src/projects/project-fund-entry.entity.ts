import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class ProjectFundEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (p) => p.fundEntries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: number;

  @Column({ type: 'float', default: 0 })
  amount: number;
}
