import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  IsObject,
  IsDateString,
  ValidateNested,
} from 'class-validator';

class Position3D_DTO {
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

class StoreSize_DTO {
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

class Shelf_DTO {
  @ApiProperty({ example: 'small-veg-1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'vegetables' })
  @IsString()
  type: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Position3D_DTO)
  position: Position3D_DTO;

  @ApiProperty({ example: 0 })
  @IsNumber()
  rotation: number;

  @ApiProperty({ example: 'medium' })
  @IsString()
  size: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  interactions: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  discount: number;
}

export class CreateStoreLayoutDTO {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => StoreSize_DTO)
  storeSize: StoreSize_DTO;

  @ApiProperty({ type: [Shelf_DTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Shelf_DTO)
  shelves: Shelf_DTO[];

  @ApiProperty({ example: '2025-04-05T10:00:42.441Z' })
  @IsDateString()
  createdAt: string;
}
