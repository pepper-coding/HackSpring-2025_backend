// src/store/dto/create-store.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePresetDto {
  @ApiProperty({ description: 'The name of the store' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Width of the store' })
  @IsInt()
  width: number;

  @ApiProperty({ description: 'Height of the store' })
  @IsInt()
  height: number;

  @ApiProperty({ description: 'Customer number of the store' })
  @IsInt()
  customerNumber: number;
}
