import { Module } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { ShelfController } from './shelf.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ShelfController],
  providers: [ShelfService, PrismaService],
  exports: [ShelfService],
})
export class ShelfModule {}
