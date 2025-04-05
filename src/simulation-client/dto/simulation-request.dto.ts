import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, IsObject, IsOptional, IsBoolean, ValidateNested } from 'class-validator';

export class PositionDto {
  @ApiProperty({ example: -1 })
  @IsNumber()
  x: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  y: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  z: number;
}

export class ShelfDto {
  @ApiProperty({ example: 'small-veg-1' })
  @IsString()
  id: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => PositionDto)
  position: PositionDto;

  @ApiProperty({ example: 0 })
  @IsNumber()
  rotation: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  interactions: number;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  discount?: number;
}

export class StoreSizeDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  width: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  length: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  height: number;
}

export class StoreConfigDto {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => StoreSizeDto)
  storeSize: StoreSizeDto;

  @ApiProperty({ type: [ShelfDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShelfDto)
  shelves: ShelfDto[];

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => PositionDto)
  entrance: PositionDto;

  @ApiProperty({ type: [PositionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PositionDto)
  cashDesks: PositionDto[];

  @ApiProperty({ example: '2025-04-05T10:00:42.441Z' })
  @IsString()
  createdAt: string;
}

export class SimulationRequestDto {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => StoreConfigDto)
  config: StoreConfigDto;

  @ApiProperty({ example: 'afternoon' })
  @IsString()
  timeOfDay: string;

  @ApiProperty({ type: [String], required: false, example: ['weekend-sale'] })
  @IsArray()
  @IsOptional()
  promotions?: string[];

  @ApiProperty({ type: [String], required: false, example: ['bakery', 'vegetables'] })
  @IsArray()
  @IsOptional()
  categories?: string[];

  @ApiProperty({ type: Object, required: false, example: { 'small-veg-1': 0.15 } })
  @IsObject()
  @IsOptional()
  shelfDiscounts?: Record<string, number>;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  prefersDiscounts?: boolean;
} 