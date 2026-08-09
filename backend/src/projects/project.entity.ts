import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { ProjectCostItem } from './project-cost-item.entity';
import { ProjectInstallItem } from './project-install-item.entity';
import { ProjectFundEntry } from './project-fund-entry.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  client: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // ----- summary / financial snapshot (mirrors the excel project sheets) -----
  @Column({ type: 'float', default: 0 })
  projectCostTotal: number;

  @Column({ type: 'float', default: 0 })
  installationTotal: number;

  @Column({ type: 'float', default: 0 })
  totalPayed: number;

  @Column({ type: 'float', default: 0 })
  fund: number;

  @Column({ type: 'float', default: 0 })
  hesham: number;

  @Column({ type: 'float', default: 0 })
  sayed: number;

  @Column({ type: 'float', default: 0 })
  projectAmount: number;

  @Column({ type: 'float', default: 0 })
  remain: number;

  @OneToMany(() => ProjectCostItem, (i) => i.project, { cascade: true })
  costItems: ProjectCostItem[];

  @OneToMany(() => ProjectInstallItem, (i) => i.project, { cascade: true })
  installItems: ProjectInstallItem[];

  @OneToMany(() => ProjectFundEntry, (i) => i.project, { cascade: true })
  fundEntries: ProjectFundEntry[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
