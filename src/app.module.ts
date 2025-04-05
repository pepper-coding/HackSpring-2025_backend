import { Module } from '@nestjs/common';
import { PresetModule } from './preset/preset.module';
import { ShelfModule } from './shelf/shelf.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PresetModule, ShelfModule, PrismaModule],
})
export class AppModule {}
