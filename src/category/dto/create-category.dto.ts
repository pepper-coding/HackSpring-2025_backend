import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Название категории товаров' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Описание категории', required: false })
  @IsOptional()
  @IsString()
  description?: string;
} 