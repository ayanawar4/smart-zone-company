import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundTransaction } from './fund-transaction.entity';
import { FundService } from './fund.service';
import { FundController } from './fund.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FundTransaction])],
  controllers: [FundController],
  providers: [FundService],
  exports: [TypeOrmModule],
})
export class FundModule {}
