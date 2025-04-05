import { Module } from '@nestjs/common';
import { PresetModule } from './preset/preset.module';
import { ShelfModule } from './shelf/shelf.module';
import { PrismaModule } from './prisma/prisma.module';
import { SimulationClientModule } from './simulation-client/simulation-client.module';

@Module({
  imports: [PresetModule, ShelfModule, SimulationClientModule, PrismaModule],
})
export class AppModule {}
