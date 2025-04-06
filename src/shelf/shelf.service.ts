import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShelfDto, UpdateShelfDto } from './dto';

@Injectable()
export class ShelfService {
  constructor(private prisma: PrismaService) {}

  async create(createShelfDto: CreateShelfDto) {
    return this.prisma.shelf.create({
      data: createShelfDto,
    });
  }

  async findAll() {
    return this.prisma.shelf.findMany({
      include: {
        preset: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.shelf.findUnique({
      where: { id },
      include: {
        preset: true,
      },
    });
  }

  update(id: string, updateShelfDto: UpdateShelfDto) {
    return this.prisma.shelf.update({
      where: { id },
      data: updateShelfDto,
    });
  }

  async updateMany(
    updateShelfDto: Record<number, UpdateShelfDto & { id: string }>,
  ) {
    const responses = [];
    for (const shelf of Object.values(updateShelfDto)) {
      responses.push(this.update(shelf.id, shelf));
    }
    return this.prisma.$transaction(responses);
  }

  async delete(id: string) {
    return this.prisma.shelf.delete({
      where: { id },
    });
  }
}
