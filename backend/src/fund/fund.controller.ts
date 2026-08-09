import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { FundService } from './fund.service';
import { CreateFundTransactionDto } from './dto/create-fund-transaction.dto';
import { UpdateFundTransactionDto } from './dto/update-fund-transaction.dto';

@Controller('fund')
export class FundController {
  constructor(private readonly service: FundService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Get('balance') balance() { return this.service.balance(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateFundTransactionDto) { return this.service.create(dto); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFundTransactionDto) {
    return this.service.update(id, dto);
  }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
