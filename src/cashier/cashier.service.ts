// src/cashier/cashier.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCashierDto, UpdateCashierDto } from './dto';

@Injectable()
export class CashierService {
  constructor(private prisma: PrismaService) {}

  async create(createCashierDto: CreateCashierDto) {
    return this.prisma.cashier.create({
      data: createCashierDto,
    });
  }

  async findAll() {
    return this.prisma.cashier.findMany({
      include: {
        store: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.cashier.findUnique({
      where: { id },
      include: {
        store: true,
        queueEvents: {
          where: { exitTime: null },
          orderBy: { position: 'asc' },
        },
      },
    });
  }

  async findByStore(storeId: number) {
    return this.prisma.cashier.findMany({
      where: { storeId },
      include: {
        queueEvents: {
          where: { exitTime: null },
          orderBy: { position: 'asc' },
        },
      },
    });
  }

  async update(id: number, updateCashierDto: UpdateCashierDto) {
    return this.prisma.cashier.update({
      where: { id },
      data: updateCashierDto,
    });
  }

  async remove(id: number) {
    return this.prisma.cashier.delete({
      where: { id },
    });
  }
}