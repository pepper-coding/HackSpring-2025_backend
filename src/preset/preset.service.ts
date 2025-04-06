import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePresetDto, UpdatePresetDto } from './dto';

@Injectable()
export class PresetService {
  constructor(private prisma: PrismaService) {}

  async create(createPresetDto: CreatePresetDto) {
    return this.prisma.preset.create({
      data: createPresetDto,
      include: {
        shelves: true,
      },
    });
  }

  async findAll() {
    return this.prisma.preset.findMany({
      include: {
        shelves: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.preset.findUnique({
      where: { id },
      include: {
        shelves: true,
      },
    });
  }

  async update(id: string, updatePresetDto: UpdatePresetDto) {
    return this.prisma.preset.update({
      where: { id },
      data: updatePresetDto,
      include: {
        shelves: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.preset.delete({
      where: { id },
      include: {
        shelves: true,
      },
    });
  }
}
