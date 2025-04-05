// src/shelf/shelf.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShelfDto, UpdateShelfDto, CreateStoreLayoutDTO } from './dto';
import { StoreLayoutRequest } from './types/shelf.types';

@Injectable()
export class ShelfService {
  private readonly logger = new Logger(ShelfService.name);
  
  constructor(private prisma: PrismaService) {}

  async create(createShelfDto: CreateShelfDto) {
    return this.prisma.shelf.create({
      data: createShelfDto,
    });
  }

  async createLayout(layoutDto: CreateStoreLayoutDTO): Promise<StoreLayoutRequest> {
    this.logger.log(`Creating store layout with ${layoutDto.shelves.length} shelves`);
    
    // In a real implementation, you would save this data to the database
    // For now, we'll just return the same data structure
    // You might want to create a store first, then create shelves for it
    
    return {
      storeSize: layoutDto.storeSize,
      shelves: layoutDto.shelves,
      createdAt: layoutDto.createdAt
    };
  }

  async findAll() {
    return this.prisma.shelf.findMany({
      include: {
        store: true,
        section: true,
        products: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.shelf.findUnique({
      where: { id },
      include: {
        store: true,
        section: true,
        products: true,
      },
    });
  }

  async findByStore(storeId: number) {
    return this.prisma.shelf.findMany({
      where: { storeId },
      include: {
        section: true,
        products: true,
      },
    });
  }

  async findBySection(sectionId: number) {
    return this.prisma.shelf.findMany({
      where: { sectionId },
      include: {
        products: true,
      },
    });
  }

  async update(id: number, updateShelfDto: UpdateShelfDto) {
    return this.prisma.shelf.update({
      where: { id },
      data: updateShelfDto,
    });
  }

  async remove(id: number) {
    return this.prisma.shelf.delete({
      where: { id },
    });
  }
}