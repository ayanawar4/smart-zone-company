import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  no: number;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  invoiceNo: number;

  @Column({ nullable: true })
  customer: string;

  @Column({ nullable: true })
  project: string;

  @Column({ type: 'float', default: 0 })
  deposit: number;

  @Column({ type: 'float', default: 0 })
  subtotal: number;

  @Column({ type: 'float', default: 0 })
  vat: number;

  @Column({ type: 'float', default: 0 })
  total: number;

  @Column({ default: false })
  statusDone: boolean;

  @Column({ default: false })
  statusUnderConstruction: boolean;

  @Column({ type: 'float', default: 0 })
  commission3pct: number;

  @Column({ type: 'float', default: 0 })
  commission1pct: number;

  @Column({ type: 'float', default: 0 })
  remainSmartZone: number;

  @Column({ type: 'float', default: 0 })
  remainCustomer: number;

  @CreateDateColumn()
  createdAt: Date;
}
