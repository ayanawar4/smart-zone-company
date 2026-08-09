import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salary } from './salary.entity';
import { SalariesService } from './salaries.service';
import { SalariesController } from './salaries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Salary])],
  controllers: [SalariesController],
  providers: [SalariesService],
  exports: [TypeOrmModule],
})
export class SalariesModule {}
