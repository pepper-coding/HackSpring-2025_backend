import { IsString, IsNumber, IsOptional, IsPositive, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'Название товара', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Цена товара', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({ description: 'Рейтинг популярности товара (от 0 до 10)', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  popularity?: number;

  @ApiProperty({ description: 'Текущая скидка на товар (процент от 0 до 100)', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount?: number;

  @ApiProperty({ description: 'ID категории товара', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  categoryId?: number;

  @ApiProperty({ description: 'ID стеллажа, на котором размещен товар', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  shelfId?: number;
} 