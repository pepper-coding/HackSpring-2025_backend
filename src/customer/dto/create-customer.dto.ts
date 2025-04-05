import { IsNotEmpty, IsNumber, IsObject, IsOptional, Min, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CustomerProfile {
  @ApiProperty({ description: 'Название профиля', example: 'любит скидки' })
  name: string;

  @ApiProperty({ description: 'Коэффициент влияния профиля (от 0 до 1)', example: 0.8 })
  factor: number;
}

export class CategoryPreference {
  @ApiProperty({ description: 'ID категории товаров' })
  categoryId: number;

  @ApiProperty({ description: 'Коэффициент предпочтения (от 0 до 1)', example: 0.7 })
  preference: number;
}

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Профили поведения покупателя',
    isArray: true,
    type: CustomerProfile,
    example: [
      { name: 'любит скидки', factor: 0.9 },
      { name: 'покупает электронику', factor: 0.6 }
    ]
  })
  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  profiles: CustomerProfile[];

  @ApiProperty({ description: 'Бюджет покупателя', example: 10000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  budget: number;

  @ApiProperty({
    description: 'Предпочтения покупателя по категориям товаров',
    isArray: true,
    type: CategoryPreference,
    example: [
      { categoryId: 1, preference: 0.8 },
      { categoryId: 2, preference: 0.3 }
    ]
  })
  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  preferences: CategoryPreference[];

  @ApiProperty({
    description: 'Частота посещений магазина (раз в неделю)',
    default: 1.0,
    example: 2.5
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  visitFrequency?: number;
} 