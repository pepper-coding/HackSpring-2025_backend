// src/section/section.module.ts
import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [SectionController],
  providers: [SectionService, PrismaService],
  exports: [SectionService],
})
export class SectionModule {}