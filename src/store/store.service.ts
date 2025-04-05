// src/store/store.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto, UpdateStoreDto } from './dto';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  async create(createStoreDto: CreateStoreDto) {
    return this.prisma.store.create({
      data: createStoreDto,
    });
  }

  async findAll() {
    return this.prisma.store.findMany({
      include: {
        sections: true,
        shelves: true,
        cashiers: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.store.findUnique({
      where: { id },
      include: {
        sections: true,
        shelves: true,
        cashiers: true,
      },
    });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    return this.prisma.store.update({
      where: { id },
      data: updateStoreDto,
    });
  }

  async remove(id: number) {
    return this.prisma.store.delete({
      where: { id },
    });
  }
}