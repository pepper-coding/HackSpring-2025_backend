import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: string, updateShelfDto: UpdateShelfDto) {
    const shelf = await this.prisma.shelf.findUnique({ where: { id } });
  
    if (!shelf) {
      throw new NotFoundException(`Shelf with id ${id} not found`);
    }
  
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
      const updated = await this.update(shelf.id, shelf);
      responses.push(updated);
    }
    return responses;
  }
  

  async delete(id: string) {
    return this.prisma.shelf.delete({
      where: { id },
    });
  }
}
