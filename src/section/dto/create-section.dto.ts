// src/section/dto/create-section.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateSectionDto {
  @ApiProperty({ description: 'The name of the section' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'X coordinate of the section' })
  @IsInt()
  coordinateX: number;

  @ApiProperty({ description: 'Y coordinate of the section' })
  @IsInt()
  coordinateY: number;

  @ApiProperty({ description: 'Width of the section' })
  @IsInt()
  width: number;

  @ApiProperty({ description: 'Height of the section' })
  @IsInt()
  height: number;

  @ApiProperty({ description: 'Type of the section' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Store ID the section belongs to' })
  @IsInt()
  storeId: number;
}