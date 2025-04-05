import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ description: 'Название категории товаров', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Описание категории', required: false })
  @IsOptional()
  @IsString()
  description?: string;
} 