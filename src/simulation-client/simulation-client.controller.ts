import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SimulationClientService } from './simulation-client.service';
import { SimulationResponse } from './simulation-client.service';
import { SimulationRequestDto } from './dto/simulation-request.dto';

@ApiTags('simulation')
@Controller('simulation')
export class SimulationClientController {
  private readonly logger = new Logger(SimulationClientController.name);

  constructor(private readonly simulationClientService: SimulationClientService) {}

  @Post('run')
  @ApiOperation({ summary: 'Run simulation with the Python backend' })
  @ApiResponse({ 
    status: 200, 
    description: 'Simulation results',
    type: Object 
  })
  @ApiBody({
    description: 'Simulation configuration with store layout, time of day, and other parameters',
    type: SimulationRequestDto
  })
  async runSimulation(@Body() simulationRequest: SimulationRequestDto): Promise<SimulationResponse> {
    this.logger.log('Received request to run simulation');
    return this.simulationClientService.simulate(simulationRequest);
  }
} 