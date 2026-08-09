import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateFundTransactionDto {
  @IsOptional() @IsNumber() no?: number;
  @IsOptional() @IsString() date?: string;
  @IsOptional() @IsString() project?: string;
  @IsOptional() @IsString() item?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsNumber() amountIn?: number;
  @IsOptional() @IsNumber() amountOut?: number;
  @IsOptional() @IsNumber() balanceAfter?: number;
  @IsOptional() @IsString() note?: string;
}
