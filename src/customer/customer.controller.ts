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
import { CustomerService } from './customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('покупатели')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Создать нового покупателя' })
  @ApiResponse({ status: 201, description: 'Покупатель успешно создан' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех покупателей' })
  @ApiResponse({ status: 200, description: 'Список покупателей успешно получен' })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить покупателя по ID' })
  @ApiParam({ name: 'id', description: 'ID покупателя' })
  @ApiResponse({ status: 200, description: 'Покупатель успешно найден' })
  @ApiResponse({ status: 404, description: 'Покупатель не найден' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить покупателя' })
  @ApiParam({ name: 'id', description: 'ID покупателя' })
  @ApiResponse({ status: 200, description: 'Покупатель успешно обновлен' })
  @ApiResponse({ status: 404, description: 'Покупатель не найден' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить покупателя' })
  @ApiParam({ name: 'id', description: 'ID покупателя' })
  @ApiResponse({ status: 200, description: 'Покупатель успешно удален' })
  @ApiResponse({ status: 404, description: 'Покупатель не найден' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Сгенерировать случайных покупателей' })
  @ApiQuery({
    name: 'count',
    required: false,
    description: 'Количество покупателей для генерации',
    type: Number,
  })
  @ApiResponse({ status: 201, description: 'Покупатели успешно созданы' })
  generateRandomCustomers(@Query('count') countParam?: string) {
    const count = countParam ? parseInt(countParam, 10) : 30;
    return this.customerService.generateRandomCustomers(count);
  }
} 