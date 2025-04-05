// src/shelf/shelf.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ShelfService } from './shelf.service';
import { CreateShelfDto, UpdateShelfDto, CreateStoreLayoutDTO } from './dto';

@ApiTags('shelves')
@Controller('shelves')
export class ShelfController {
  constructor(private readonly shelfService: ShelfService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shelf' })
  @ApiResponse({ status: 201, description: 'The shelf has been successfully created.' })
  create(@Body() createShelfDto: CreateShelfDto) {
    return this.shelfService.create(createShelfDto);
  }

  @Post('layout')
  @ApiOperation({ summary: 'Create or update store layout with shelves' })
  @ApiResponse({ status: 201, description: 'The store layout has been successfully created.' })
  createLayout(@Body() createStoreLayoutDto: CreateStoreLayoutDTO) {
    return this.shelfService.createLayout(createStoreLayoutDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shelves' })
  findAll() {
    return this.shelfService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shelf by id' })
  findOne(@Param('id') id: string) {
    return this.shelfService.findOne(+id);
  }

  @Get('store/:storeId')
  @ApiOperation({ summary: 'Get shelves by store id' })
  findByStore(@Param('storeId') storeId: string) {
    return this.shelfService.findByStore(+storeId);
  }

  @Get('section/:sectionId')
  @ApiOperation({ summary: 'Get shelves by section id' })
  findBySection(@Param('sectionId') sectionId: string) {
    return this.shelfService.findBySection(+sectionId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a shelf' })
  update(@Param('id') id: string, @Body() updateShelfDto: UpdateShelfDto) {
    return this.shelfService.update(+id, updateShelfDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shelf' })
  remove(@Param('id') id: string) {
    return this.shelfService.remove(+id);
  }
}