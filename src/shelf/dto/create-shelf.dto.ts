import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { ShelfType, ShelfSize } from '../types/shelf.types';

export class CreateShelfDto {
  @ApiProperty({ description: 'The name of the shelf' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The type of the shelf',
    enum: [
      'dairy',
      'bakery',
      'produce',
      'meat',
      'vegetables',
      'wall',
      'cashier',
    ],
    example: 'dairy',
  })
  @IsEnum(ShelfType)
  @IsNotEmpty()
  type: ShelfType;

  @ApiProperty({
    description: 'The size of the shelf',
    enum: ['small', 'medium', 'large'],
    example: 'medium',
  })
  @IsEnum(ShelfSize)
  @IsNotEmpty()
  size: ShelfSize;

  @ApiProperty({ description: 'X coordinate of the shelf' })
  @IsNumber()
  x: number;

  @ApiProperty({ description: 'Y coordinate of the shelf' })
  @IsNumber()
  y: number;

  @ApiProperty({ description: 'Rotation of the shelf' })
  @IsNumber()
  rotation: number;

  @ApiProperty({ description: 'Interactions of the shelf' })
  @IsNumber()
  interactions: number;

  @ApiProperty({ description: 'Store ID the shelf belongs to' })
  @IsNotEmpty()
  presetId: string;
}
