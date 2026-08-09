import { IsString, IsOptional, IsNumber } from 'class-validator';

class CostItemDto {
  item: string;
  unitPrice?: number;
  qty?: number;
  totalPrice?: number;
}

class InstallItemDto {
  date?: string;
  name: string;
  unitPrice?: number;
  qty?: number;
  totalPrice?: number;
}

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsOptional() @IsString()
  client?: string;

  @IsOptional() @IsString()
  status?: string;

  @IsOptional() @IsString()
  notes?: string;

  @IsOptional() @IsNumber()
  fund?: number;

  @IsOptional() @IsNumber()
  hesham?: number;

  @IsOptional() @IsNumber()
  sayed?: number;

  @IsOptional() @IsNumber()
  projectAmount?: number;

  @IsOptional() @IsNumber()
  totalPayed?: number;

  @IsOptional() @IsNumber()
  remain?: number;

  @IsOptional()
  costItems?: CostItemDto[];

  @IsOptional()
  installItems?: InstallItemDto[];
}
