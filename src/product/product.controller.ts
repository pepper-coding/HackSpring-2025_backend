import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('товары')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый товар' })
  @ApiResponse({ status: 201, description: 'Товар успешно создан' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех товаров' })
  @ApiResponse({ status: 200, description: 'Список товаров успешно получен' })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'Фильтр по ID категории',
    type: Number,
  })
  findAll(@Query('categoryId') categoryId?: string) {
    if (categoryId) {
      const categoryIdNumber = parseInt(categoryId, 10);
      return this.productService.findByCategoryId(categoryIdNumber);
    }
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить товар по ID' })
  @ApiParam({ name: 'id', description: 'ID товара' })
  @ApiResponse({ status: 200, description: 'Товар успешно найден' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить товар' })
  @ApiParam({ name: 'id', description: 'ID товара' })
  @ApiResponse({ status: 200, description: 'Товар успешно обновлен' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить товар' })
  @ApiParam({ name: 'id', description: 'ID товара' })
  @ApiResponse({ status: 200, description: 'Товар успешно удален' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }

  @Patch(':id/discount')
  @ApiOperation({ summary: 'Установить скидку на товар' })
  @ApiParam({ name: 'id', description: 'ID товара' })
  @ApiQuery({
    name: 'percent',
    description: 'Процент скидки (от 0 до 100)',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'Скидка успешно установлена' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  applyDiscount(
    @Param('id', ParseIntPipe) id: number,
    @Query('percent', ParseIntPipe) percent: number,
  ) {
    return this.productService.applyDiscount(id, percent);
  }
} 