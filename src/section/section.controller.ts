// src/section/section.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SectionService } from './section.service';
import { CreateSectionDto, UpdateSectionDto } from './dto';

@ApiTags('sections')
@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new section' })
  @ApiResponse({ status: 201, description: 'The section has been successfully created.' })
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sections' })
  findAll() {
    return this.sectionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a section by id' })
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(+id);
  }

  @Get('store/:storeId')
  @ApiOperation({ summary: 'Get sections by store id' })
  findByStore(@Param('storeId') storeId: string) {
    return this.sectionService.findByStore(+storeId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a section' })
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(+id, updateSectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a section' })
  remove(@Param('id') id: string) {
    return this.sectionService.remove(+id);
  }
}