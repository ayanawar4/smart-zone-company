import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateExpenseDto {
  @IsOptional() @IsString() source?: string;
  @IsOptional() @IsNumber() amount?: number;
  @IsOptional() @IsString() date?: string;
  @IsOptional() @IsString() note?: string;
}
