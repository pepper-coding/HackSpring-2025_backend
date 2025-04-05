import { IsString, IsNumber, IsOptional, IsArray, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class UpdatePromotionDto {
  @ApiProperty({ description: 'Название акции', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Описание акции', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Процент скидки (от 0 до 100)', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercentage?: number;

  @ApiProperty({
    description: 'Дата начала акции',
    required: false,
    example: '2023-06-01T10:00:00.000Z'
  })
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  startDate?: Date;

  @ApiProperty({
    description: 'Дата окончания акции',
    required: false,
    example: '2023-06-30T23:59:59.000Z'
  })
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  endDate?: Date;

  @ApiProperty({
    description: 'Список ID категорий, на которые распространяется акция',
    required: false,
    isArray: true,
    type: Number,
    example: [1, 2, 3]
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  targetCategories?: number[];

  @ApiProperty({
    description: 'Список ID товаров, на которые распространяется акция',
    required: false,
    isArray: true,
    type: Number,
    example: [1, 5, 10]
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  targetProducts?: number[];
} 