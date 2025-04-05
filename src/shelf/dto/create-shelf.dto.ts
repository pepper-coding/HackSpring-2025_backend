// src/shelf/dto/create-shelf.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ShelfType, ShelfSize } from '../types/shelf.types';

export class CreateShelfDto {
  @ApiProperty({ description: 'The name of the shelf' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: 'The type of the shelf',
    enum: ['dairy', 'bakery', 'produce', 'meat', 'vegetables'],
    example: 'dairy'
  })
  @IsEnum(ShelfType)
  @IsNotEmpty()
  type: ShelfType;

  @ApiProperty({
    description: 'The size of the shelf',
    enum: ['small', 'medium', 'large'],
    example: 'medium'
  })
  @IsEnum(ShelfSize)
  @IsNotEmpty()
  size: ShelfSize;

  @ApiProperty({ description: 'The capacity of the shelf' })
  @IsInt()
  capacity: number;

  @ApiProperty({ description: 'X coordinate of the shelf' })
  @IsInt()
  coordinateX: number;

  @ApiProperty({ description: 'Y coordinate of the shelf' })
  @IsInt()
  coordinateY: number;

  @ApiProperty({ description: 'Width of the shelf' })
  @IsInt()
  width: number;

  @ApiProperty({ description: 'Height of the shelf' })
  @IsInt()
  height: number;

  @ApiProperty({ description: 'Store ID the shelf belongs to' })
  @IsInt()
  storeId: number;

  @ApiProperty({ description: 'Section ID the shelf belongs to', required: false })
  @IsInt()
  @IsOptional()
  sectionId?: number;
}