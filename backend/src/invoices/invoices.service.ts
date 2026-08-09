import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(@InjectRepository(Invoice) private repo: Repository<Invoice>) {}

  findAll() { return this.repo.find({ order: { id: 'ASC' } }); }

  async findOne(id: number) {
    const i = await this.repo.findOne({ where: { id } });
    if (!i) throw new NotFoundException('Invoice not found');
    return i;
  }

  private computeDerived(dto: Partial<Invoice>) {
    const subtotal = dto.subtotal ?? 0;
    const vat = dto.vat ?? Math.round(subtotal * 0.14 * 100) / 100;
    const total = dto.total ?? subtotal + vat;
    return { ...dto, vat, total };
  }

  create(dto: CreateInvoiceDto) {
    return this.repo.save(this.repo.create(this.computeDerived(dto)));
  }

  async update(id: number, dto: UpdateInvoiceDto) {
    const i = await this.findOne(id);
    Object.assign(i, dto);
    return this.repo.save(i);
  }

  async remove(id: number) {
    const i = await this.findOne(id);
    await this.repo.remove(i);
    return { success: true };
  }
}
