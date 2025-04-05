import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto, UpdatePromotionDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('акции')
@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую акцию' })
  @ApiResponse({ status: 201, description: 'Акция успешно создана' })
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех акций' })
  @ApiResponse({ status: 200, description: 'Список акций успешно получен' })
  findAll() {
    return this.promotionService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Получить список активных акций' })
  @ApiResponse({ status: 200, description: 'Список активных акций успешно получен' })
  getActivePromotions() {
    return this.promotionService.getActivePromotions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить акцию по ID' })
  @ApiParam({ name: 'id', description: 'ID акции' })
  @ApiResponse({ status: 200, description: 'Акция успешно найдена' })
  @ApiResponse({ status: 404, description: 'Акция не найдена' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.promotionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить акцию' })
  @ApiParam({ name: 'id', description: 'ID акции' })
  @ApiResponse({ status: 200, description: 'Акция успешно обновлена' })
  @ApiResponse({ status: 404, description: 'Акция не найдена' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionService.update(id, updatePromotionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить акцию' })
  @ApiParam({ name: 'id', description: 'ID акции' })
  @ApiResponse({ status: 200, description: 'Акция успешно удалена' })
  @ApiResponse({ status: 404, description: 'Акция не найдена' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.promotionService.remove(id);
  }

  @Post('seed')
  @ApiOperation({ summary: 'Создать тестовые акции' })
  @ApiResponse({ status: 201, description: 'Тестовые акции успешно созданы' })
  seedPromotions() {
    return this.promotionService.seedPromotions();
  }
} 