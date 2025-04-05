// src/section/section.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto, UpdateSectionDto } from './dto';

@Injectable()
export class SectionService {
  constructor(private prisma: PrismaService) {}

  async create(createSectionDto: CreateSectionDto) {
    return this.prisma.section.create({
      data: createSectionDto,
    });
  }

  async findAll() {
    return this.prisma.section.findMany({
      include: {
        store: true,
        shelves: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.section.findUnique({
      where: { id },
      include: {
        store: true,
        shelves: true,
      },
    });
  }

  async findByStore(storeId: number) {
    return this.prisma.section.findMany({
      where: { storeId },
      include: {
        shelves: true,
      },
    });
  }

  async update(id: number, updateSectionDto: UpdateSectionDto) {
    return this.prisma.section.update({
      where: { id },
      data: updateSectionDto,
    });
  }

  async remove(id: number) {
    return this.prisma.section.delete({
      where: { id },
    });
  }
}