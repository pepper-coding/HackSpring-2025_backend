import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsEnum } from 'class-validator';
import { ShelfType, ShelfSize } from '../types/shelf.types';

export class CreateShelfDto {
  @ApiProperty({ description: 'The name of the shelf' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The type of the shelf',
    enum: ['dairy', 'bakery', 'produce', 'meat', 'vegetables'],
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
  @IsInt()
  x: number;

  @ApiProperty({ description: 'Y coordinate of the shelf' })
  @IsInt()
  y: number;

  @ApiProperty({ description: 'Store ID the shelf belongs to' })
  @IsInt()
  presetId: string;
}
