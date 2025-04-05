// src/cashier/cashier.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CashierService } from './cashier.service';
import { CreateCashierDto, UpdateCashierDto } from './dto';

@ApiTags('cashiers')
@Controller('cashiers')
export class CashierController {
  constructor(private readonly cashierService: CashierService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cashier' })
  @ApiResponse({ status: 201, description: 'The cashier has been successfully created.' })
  create(@Body() createCashierDto: CreateCashierDto) {
    return this.cashierService.create(createCashierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cashiers' })
  findAll() {
    return this.cashierService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cashier by id' })
  findOne(@Param('id') id: string) {
    return this.cashierService.findOne(+id);
  }

  @Get('store/:storeId')
  @ApiOperation({ summary: 'Get cashiers by store id' })
  findByStore(@Param('storeId') storeId: string) {
    return this.cashierService.findByStore(+storeId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a cashier' })
  update(@Param('id') id: string, @Body() updateCashierDto: UpdateCashierDto) {
    return this.cashierService.update(+id, updateCashierDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cashier' })
  remove(@Param('id') id: string) {
    return this.cashierService.remove(+id);
  }
}