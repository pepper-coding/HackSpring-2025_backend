import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SimulationSettingsDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('симуляция')
@Controller('simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Get('state')
  @ApiOperation({ summary: 'Получить текущее состояние симуляции' })
  @ApiResponse({ status: 200, description: 'Состояние симуляции успешно получено' })
  getSimulationState() {
    return this.simulationService.getSimulationState();
  }

  @Post('start/:storeId')
  @ApiOperation({ summary: 'Запустить симуляцию для указанного магазина' })
  @ApiParam({ name: 'storeId', description: 'ID магазина' })
  @ApiResponse({ status: 200, description: 'Симуляция успешно запущена' })
  startSimulation(@Param('storeId', ParseIntPipe) storeId: number) {
    this.simulationService.startSimulation(storeId);
    return { message: `Симуляция запущена для магазина с ID: ${storeId}` };
  }

  @Post('stop')
  @ApiOperation({ summary: 'Остановить текущую симуляцию' })
  @ApiResponse({ status: 200, description: 'Симуляция успешно остановлена' })
  stopSimulation() {
    this.simulationService.stopSimulation();
    return { message: 'Симуляция остановлена' };
  }

  @Post('reset')
  @ApiOperation({ summary: 'Сбросить симуляцию в начальное состояние' })
  @ApiResponse({ status: 200, description: 'Симуляция успешно сброшена' })
  resetSimulation() {
    this.simulationService.resetSimulation();
    return { message: 'Симуляция сброшена' };
  }

  @Patch('settings')
  @ApiOperation({ summary: 'Обновить настройки симуляции' })
  @ApiResponse({ status: 200, description: 'Настройки успешно обновлены' })
  updateSettings(@Body() settingsDto: SimulationSettingsDto) {
    return this.simulationService.updateSettings(settingsDto);
  }

  @Get('predict')
  @ApiOperation({ summary: 'Спрогнозировать трафик на указанное количество часов вперед' })
  @ApiQuery({
    name: 'hours',
    description: 'Количество часов для прогноза',
    type: Number,
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Прогноз успешно получен' })
  predictTraffic(@Query('hours') hours: string = '6') {
    const hoursAhead = parseInt(hours, 10);
    return this.simulationService.predictTraffic(hoursAhead);
  }

  @Get('recommendations')
  @ApiOperation({ summary: 'Получить рекомендации по оптимизации магазина' })
  @ApiResponse({ status: 200, description: 'Рекомендации успешно получены' })
  getRecommendations() {
    return this.simulationService.generateRecommendations();
  }

  @Post('event')
  @ApiOperation({ summary: 'Сгенерировать случайное событие в магазине' })
  @ApiResponse({ status: 200, description: 'Событие успешно сгенерировано' })
  generateEvent() {
    this.simulationService.generateStoreEvent();
    return { message: 'Событие сгенерировано' };
  }
} 