import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateInvoiceDto {
  @IsOptional() @IsNumber() no?: number;
  @IsOptional() @IsString() date?: string;
  @IsOptional() @IsNumber() invoiceNo?: number;
  @IsOptional() @IsString() customer?: string;
  @IsOptional() @IsString() project?: string;
  @IsOptional() @IsNumber() deposit?: number;
  @IsOptional() @IsNumber() subtotal?: number;
  @IsOptional() @IsNumber() vat?: number;
  @IsOptional() @IsNumber() total?: number;
  @IsOptional() @IsBoolean() statusDone?: boolean;
  @IsOptional() @IsBoolean() statusUnderConstruction?: boolean;
  @IsOptional() @IsNumber() commission3pct?: number;
  @IsOptional() @IsNumber() commission1pct?: number;
  @IsOptional() @IsNumber() remainSmartZone?: number;
  @IsOptional() @IsNumber() remainCustomer?: number;
}
