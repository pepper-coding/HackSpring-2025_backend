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
import { PresetService } from './preset.service';
import { CreatePresetDto, UpdatePresetDto } from './dto';

@ApiTags('presets')
@Controller('presets')
export class PresetController {
  constructor(private readonly presetService: PresetService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new preset' })
  @ApiResponse({
    status: 201,
    description: 'The preset has been successfully created.',
  })
  create(@Body() createPresetDto: CreatePresetDto) {
    return this.presetService.create(createPresetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all presets' })
  findAll() {
    return this.presetService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a preset by id' })
  findOne(@Param('id') id: string) {
    return this.presetService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a preset' })
  update(@Param('id') id: string, @Body() updatePresetDto: UpdatePresetDto) {
    return this.presetService.update(id, updatePresetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a preset' })
  remove(@Param('id') id: string) {
    return this.presetService.delete(id);
  }
}
