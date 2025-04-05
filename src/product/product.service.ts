import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Проверяем существование категории
    await this.validateCategory(createProductDto.categoryId);

    // Проверяем существование стеллажа, если он указан
    if (createProductDto.shelfId) {
      await this.validateShelf(createProductDto.shelfId);
    }

    return this.prisma.product.create({
      data: createProductDto,
      include: {
        category: true,
        shelf: true,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        shelf: true,
      },
    });
  }

  async findByCategoryId(categoryId: number) {
    // Проверяем существование категории
    await this.validateCategory(categoryId);

    return this.prisma.product.findMany({
      where: { categoryId },
      include: {
        category: true,
        shelf: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        shelf: true,
        purchases: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Товар с ID ${id} не найден`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Проверяем существование товара
    await this.findOne(id);

    // Проверяем существование категории, если она указана
    if (updateProductDto.categoryId) {
      await this.validateCategory(updateProductDto.categoryId);
    }

    // Проверяем существование стеллажа, если он указан
    if (updateProductDto.shelfId) {
      await this.validateShelf(updateProductDto.shelfId);
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        category: true,
        shelf: true,
      },
    });
  }

  async remove(id: number) {
    // Проверяем существование товара
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }

  async applyDiscount(id: number, discountPercent: number) {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new BadRequestException('Скидка должна быть от 0 до 100 процентов');
    }

    // Проверяем существование товара
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: { discount: discountPercent },
      include: {
        category: true,
      },
    });
  }

  // Вспомогательные методы для валидации
  private async validateCategory(categoryId: number) {
    try {
      await this.categoryService.findOne(categoryId);
    } catch (error) {
      throw new BadRequestException(`Категория с ID ${categoryId} не найдена`);
    }
  }

  private async validateShelf(shelfId: number) {
    const shelf = await this.prisma.shelf.findUnique({
      where: { id: shelfId },
    });

    if (!shelf) {
      throw new BadRequestException(`Стеллаж с ID ${shelfId} не найден`);
    }
  }
} 