// src/cashier/dto/create-cashier.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCashierDto {
  @ApiProperty({ description: 'The number of the cashier' })
  @IsInt()
  @IsNotEmpty()
  number: number;

  @ApiProperty({ description: 'X coordinate of the cashier' })
  @IsInt()
  coordinateX: number;

  @ApiProperty({ description: 'Y coordinate of the cashier' })
  @IsInt()
  coordinateY: number;

  @ApiProperty({ description: 'Whether the cashier is working', default: true })
  @IsBoolean()
  @IsOptional()
  isWorking?: boolean;

  @ApiProperty({ description: 'Average service time in seconds' })
  @IsInt()
  serviceTime: number;

  @ApiProperty({ description: 'Store ID the cashier belongs to' })
  @IsInt()
  storeId: number;
}