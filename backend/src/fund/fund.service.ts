import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FundTransaction } from './fund-transaction.entity';
import { CreateFundTransactionDto } from './dto/create-fund-transaction.dto';
import { UpdateFundTransactionDto } from './dto/update-fund-transaction.dto';

@Injectable()
export class FundService {
  constructor(@InjectRepository(FundTransaction) private repo: Repository<FundTransaction>) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const tx = await this.repo.findOne({ where: { id } });
    if (!tx) throw new NotFoundException('Transaction not found');
    return tx;
  }

  async create(dto: CreateFundTransactionDto) {
    const last = await this.repo.find({ order: { id: 'DESC' }, take: 1 });
    const prevBalance = last[0]?.balanceAfter || 0;
    const balanceAfter = dto.balanceAfter ?? prevBalance + (dto.amountIn || 0) - (dto.amountOut || 0);
    const tx = this.repo.create({ ...dto, balanceAfter });
    return this.repo.save(tx);
  }

  async update(id: number, dto: UpdateFundTransactionDto) {
    const tx = await this.findOne(id);
    Object.assign(tx, dto);
    return this.repo.save(tx);
  }

  async remove(id: number) {
    const tx = await this.findOne(id);
    await this.repo.remove(tx);
    return { success: true };
  }

  async balance() {
    const last = await this.repo.find({ order: { id: 'DESC' }, take: 1 });
    return { balance: last[0]?.balanceAfter || 0 };
  }
}
