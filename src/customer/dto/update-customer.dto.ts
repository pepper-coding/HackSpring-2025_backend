import { IsNumber, IsOptional, Min, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerProfile, CategoryPreference } from './create-customer.dto';
import { Transform } from 'class-transformer';

export class UpdateCustomerDto {
  @ApiProperty({
    description: 'Профили поведения покупателя',
    isArray: true,
    type: CustomerProfile,
    required: false,
    example: [
      { name: 'любит скидки', factor: 0.9 },
      { name: 'покупает электронику', factor: 0.6 }
    ]
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  profiles?: CustomerProfile[];

  @ApiProperty({ description: 'Бюджет покупателя', required: false, example: 10000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  budget?: number;

  @ApiProperty({
    description: 'Предпочтения покупателя по категориям товаров',
    isArray: true,
    type: CategoryPreference,
    required: false,
    example: [
      { categoryId: 1, preference: 0.8 },
      { categoryId: 2, preference: 0.3 }
    ]
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  preferences?: CategoryPreference[];

  @ApiProperty({
    description: 'Частота посещений магазина (раз в неделю)',
    required: false,
    example: 2.5
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  visitFrequency?: number;
} 