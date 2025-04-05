import { Controller, Post, Get, Query, ParseIntPipe } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('seed')
@Controller('seed')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('categories')
  @ApiOperation({ summary: 'Загрузить тестовые категории товаров' })
  @ApiResponse({ status: 201, description: 'Категории успешно созданы' })
  seedCategories() {
    return this.seederService.seedCategories();
  }

  @Post('products')
  @ApiOperation({ summary: 'Загрузить тестовые товары' })
  @ApiResponse({ status: 201, description: 'Товары успешно созданы' })
  seedProducts() {
    return this.seederService.seedProducts();
  }

  @Post('customers')
  @ApiOperation({ summary: 'Создать тестовых покупателей' })
  @ApiQuery({
    name: 'count',
    required: false,
    description: 'Количество покупателей для создания',
    type: Number,
  })
  @ApiResponse({ status: 201, description: 'Покупатели успешно созданы' })
  seedCustomers(@Query('count', new ParseIntPipe({ optional: true })) count?: number) {
    return this.seederService.seedCustomers(count || 30);
  }

  @Post('clear')
  @ApiOperation({ summary: 'Очистить тестовые данные (категории и товары)' })
  @ApiResponse({ status: 200, description: 'Данные успешно очищены' })
  clearData() {
    return this.seederService.clearData();
  }

  @Post('all')
  @ApiOperation({ summary: 'Загрузить все тестовые данные (категории, товары, покупатели)' })
  @ApiResponse({ status: 201, description: 'Данные успешно загружены' })
  seedAll() {
    return this.seederService.seedAll();
  }
} 