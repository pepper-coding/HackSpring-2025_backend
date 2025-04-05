// src/store/dto/create-store.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({ description: 'The name of the store' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The address of the store', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'X coordinate of the store' })
  @IsInt()
  coordinateX: number;

  @ApiProperty({ description: 'Y coordinate of the store' })
  @IsInt()
  coordinateY: number;

  @ApiProperty({ description: 'Width of the store' })
  @IsInt()
  width: number;

  @ApiProperty({ description: 'Height of the store' })
  @IsInt()
  height: number;

  @ApiProperty({ description: 'Working hours of the store' })
  @IsObject()
  workingHours: Record<string, any>;
}