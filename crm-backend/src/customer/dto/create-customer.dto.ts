/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(100) // Example: add a max length
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
