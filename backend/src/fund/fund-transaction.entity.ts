import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class FundTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  no: number;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  project: string;

  @Column({ nullable: true })
  item: string;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'float', default: 0 })
  amountIn: number;

  @Column({ type: 'float', default: 0 })
  amountOut: number;

  @Column({ type: 'float', default: 0 })
  balanceAfter: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn()
  createdAt: Date;
}
