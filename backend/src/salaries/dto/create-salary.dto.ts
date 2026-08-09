import { IsOptional, IsString, IsNumber, IsInt } from 'class-validator';

export class CreateSalaryDto {
  @IsString() employeeName: string;
  @IsInt() month: number;
  @IsInt() year: number;
  @IsOptional() @IsNumber() amount?: number;
  @IsOptional() @IsString() note?: string;
}
