import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { 
  IsString, 
  IsNumber, 
  IsArray, 
  IsObject, 
  IsDateString, 
  ValidateNested 
} from 'class-validator';

class Position3DDTO {
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

class StoreSizeDTO {
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

class ShelfDTO {
  @ApiProperty({ example: 'small-veg-1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'vegetables' })
  @IsString()
  type: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Position3DDTO)
  position: Position3DDTO;

  @ApiProperty({ example: 0 })
  @IsNumber()
  rotation: number;

  @ApiProperty({ example: 'medium' })
  @IsString()
  size: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  interactions: number;
}

export class CreateStoreLayoutDTO {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => StoreSizeDTO)
  storeSize: StoreSizeDTO;

  @ApiProperty({ type: [ShelfDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShelfDTO)
  shelves: ShelfDTO[];

  @ApiProperty({ example: '2025-04-05T10:00:42.441Z' })
  @IsDateString()
  createdAt: string;
} 