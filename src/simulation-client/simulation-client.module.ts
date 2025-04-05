import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SimulationClientService } from './simulation-client.service';
import { SimulationClientController } from './simulation-client.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [SimulationClientController],
  providers: [SimulationClientService],
  exports: [SimulationClientService],
})
export class SimulationClientModule {} 