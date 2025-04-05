// src/shelf/shelf.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ShelfService } from './shelf.service';
import { CreateShelfDto, UpdateShelfDto } from './dto';

@ApiTags('shelves')
@Controller('shelves')
export class ShelfController {
  constructor(private readonly shelfService: ShelfService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shelf' })
  @ApiResponse({
    status: 201,
    description: 'The shelf has been successfully created.',
  })
  create(@Body() createShelfDto: CreateShelfDto) {
    return this.shelfService.create(createShelfDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shelves' })
  findAll() {
    return this.shelfService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shelf by id' })
  findOne(@Param('id') id: string) {
    return this.shelfService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a shelf' })
  update(@Param('id') id: string, @Body() updateShelfDto: UpdateShelfDto) {
    return this.shelfService.update(id, updateShelfDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shelf' })
  remove(@Param('id') id: string) {
    return this.shelfService.delete(id);
  }
}
