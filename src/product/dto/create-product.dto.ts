import { IsNotEmpty, IsString, IsNumber, IsOptional, IsPositive, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Название товара' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Цена товара' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'Рейтинг популярности товара (от 0 до 10)', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  popularity?: number;

  @ApiProperty({ description: 'Текущая скидка на товар (процент от 0 до 100)', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount?: number;

  @ApiProperty({ description: 'ID категории товара' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  categoryId: number;

  @ApiProperty({ description: 'ID стеллажа, на котором размещен товар', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  shelfId?: number;
} 