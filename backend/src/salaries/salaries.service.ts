import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salary } from './salary.entity';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';

@Injectable()
export class SalariesService {
  constructor(@InjectRepository(Salary) private repo: Repository<Salary>) {}

  findAll() { return this.repo.find({ order: { year: 'DESC', month: 'DESC' } }); }

  async findOne(id: number) {
    const s = await this.repo.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Salary record not found');
    return s;
  }

  create(dto: CreateSalaryDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdateSalaryDto) {
    const s = await this.findOne(id);
    Object.assign(s, dto);
    return this.repo.save(s);
  }

  async remove(id: number) {
    const s = await this.findOne(id);
    await this.repo.remove(s);
    return { success: true };
  }
}
