import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SimulationRequestDto } from './dto/simulation-request.dto';
export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Shelf {
  id: string;
  position: Position;
  rotation: number;
  interactions: number;
  discount?: number;
}

export interface StoreSize {
  width: number;
  length: number;
  height: number;
}

export interface StoreConfig {
  storeSize: StoreSize;
  shelves: Shelf[];
  entrance: Position;
  cashDesks: Position[];
  createdAt: string;
}

export interface SimulationRequest {
  config: StoreConfig;
  timeOfDay: string;
  promotions?: string[];
  categories?: string[];
  shelfDiscounts?: Record<string, number>;
  prefersDiscounts?: boolean;
}

export interface SimulationResponse {
  visitors: {
    id: number;
    preferences: string[];
    path: [number, number][];
    queue_time: number;
    visited_shelves: string[];
    final_position: [number, number];
  }[];
  heatmap: number[][];
  events: {
    broken_cash_desk: boolean;
    promotions: string[];
  };
  stats: {
    total_visitors: number;
    avg_queue_time: number;
    max_queue_length: number;
    time_of_day: string;
    calculated_visitors: number;
  };
  store_dimensions: {
    width: number;
    length: number;
    grid_size: number;
  };
}

@Injectable()
export class SimulationClientService {
  private readonly logger = new Logger(SimulationClientService.name);
  private readonly apiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';

  constructor(private httpService: HttpService) {}

  async simulate(request: SimulationRequestDto): Promise<SimulationResponse> {
    this.logger.log(`Sending simulation request with ${request.config.shelves.length} shelves`);
    
    try {
      const response = await firstValueFrom(
        this.httpService.post<SimulationResponse>(`${this.apiUrl}/simulate`, request).pipe(
          map(response => response.data),
          catchError(error => {
            this.logger.error(`Failed to simulate: ${error.message}`, error.stack);
            throw new Error(`Failed to simulate: ${error.message}`);
          })
        )
      );
      
      this.logger.log(`Simulation completed with ${response.visitors.length} visitors`);
      return response;
    } catch (error) {
      this.logger.error(`Error during simulation: ${error.message}`);
      throw error;
    }
  }
} 