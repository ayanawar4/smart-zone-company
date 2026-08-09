import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateEmployeeDto {
  @IsString() name: string;
  @IsOptional() @IsString() role?: string;
  @IsOptional() @IsBoolean() active?: boolean;
  @IsOptional() @IsString() notes?: string;
}
