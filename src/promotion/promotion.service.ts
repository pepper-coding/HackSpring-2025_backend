import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePromotionDto, UpdatePromotionDto } from './dto';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class PromotionService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    // Проверяем существование категорий, если они указаны
    if (createPromotionDto.targetCategories && Array.isArray(createPromotionDto.targetCategories) && createPromotionDto.targetCategories.length) {
      await this.validateCategories(createPromotionDto.targetCategories);
    }

    // Проверяем существование товаров, если они указаны
    if (createPromotionDto.targetProducts && Array.isArray(createPromotionDto.targetProducts) && createPromotionDto.targetProducts.length) {
      await this.validateProducts(createPromotionDto.targetProducts);
    }

    // Проверяем даты акции
    this.validateDates(createPromotionDto.startDate, createPromotionDto.endDate);

    // Создаем акцию
    const promotion = await this.prisma.promotion.create({
      data: {
        name: createPromotionDto.name,
        description: createPromotionDto.description,
        discountPercentage: createPromotionDto.discountPercentage,
        startDate: createPromotionDto.startDate,
        endDate: createPromotionDto.endDate,
        targetCategories: createPromotionDto.targetCategories ? createPromotionDto.targetCategories : [],
        targetProducts: createPromotionDto.targetProducts ? createPromotionDto.targetProducts : [],
      },
    });

    // Если акция применяется к товарам, обновляем скидки на эти товары
    if (promotion.targetProducts && Array.isArray(promotion.targetProducts) && promotion.targetProducts.length) {
      await this.applyDiscountToProducts(
        promotion.targetProducts as number[],
        promotion.discountPercentage,
      );
    }

    // Если акция применяется к категориям, обновляем скидки на товары в этих категориях
    if (promotion.targetCategories && Array.isArray(promotion.targetCategories) && promotion.targetCategories.length) {
      await this.applyDiscountToCategories(
        promotion.targetCategories as number[],
        promotion.discountPercentage,
      );
    }

    return promotion;
  }

  async findAll() {
    return this.prisma.promotion.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const promotion = await this.prisma.promotion.findUnique({
      where: { id },
    });

    if (!promotion) {
      throw new NotFoundException(`Акция с ID ${id} не найдена`);
    }

    return promotion;
  }

  async getActivePromotions() {
    const now = new Date();
    return this.prisma.promotion.findMany({
      where: {
        startDate: { lte: now },
        endDate: { gte: now },
      },
    });
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    // Проверяем существование акции
    await this.findOne(id);

    // Проверяем существование категорий, если они указаны
    if (updatePromotionDto.targetCategories && Array.isArray(updatePromotionDto.targetCategories) && updatePromotionDto.targetCategories.length) {
      await this.validateCategories(updatePromotionDto.targetCategories);
    }

    // Проверяем существование товаров, если они указаны
    if (updatePromotionDto.targetProducts && Array.isArray(updatePromotionDto.targetProducts) && updatePromotionDto.targetProducts.length) {
      await this.validateProducts(updatePromotionDto.targetProducts);
    }

    // Проверяем даты акции, если они указаны
    if (updatePromotionDto.startDate && updatePromotionDto.endDate) {
      this.validateDates(updatePromotionDto.startDate, updatePromotionDto.endDate);
    } else if (updatePromotionDto.startDate || updatePromotionDto.endDate) {
      // Если только одна из дат обновляется, нужно получить текущие данные для проверки
      const currentPromotion = await this.findOne(id);
      const startDate = updatePromotionDto.startDate || currentPromotion.startDate;
      const endDate = updatePromotionDto.endDate || currentPromotion.endDate;
      this.validateDates(startDate, endDate);
    }

    // Обновляем акцию
    const updatedPromotion = await this.prisma.promotion.update({
      where: { id },
      data: {
        name: updatePromotionDto.name,
        description: updatePromotionDto.description,
        discountPercentage: updatePromotionDto.discountPercentage,
        startDate: updatePromotionDto.startDate,
        endDate: updatePromotionDto.endDate,
        targetCategories: updatePromotionDto.targetCategories,
        targetProducts: updatePromotionDto.targetProducts,
      },
    });

    // Если обновлены целевые товары или процент скидки, переприменяем скидки
    if (
      (updatePromotionDto.targetProducts || updatePromotionDto.discountPercentage !== undefined) &&
      updatedPromotion.targetProducts && Array.isArray(updatedPromotion.targetProducts) && updatedPromotion.targetProducts.length
    ) {
      await this.applyDiscountToProducts(
        updatedPromotion.targetProducts as number[],
        updatedPromotion.discountPercentage,
      );
    }

    // Если обновлены целевые категории или процент скидки, переприменяем скидки
    if (
      (updatePromotionDto.targetCategories || updatePromotionDto.discountPercentage !== undefined) &&
      updatedPromotion.targetCategories && Array.isArray(updatedPromotion.targetCategories) && updatedPromotion.targetCategories.length
    ) {
      await this.applyDiscountToCategories(
        updatedPromotion.targetCategories as number[],
        updatedPromotion.discountPercentage,
      );
    }

    return updatedPromotion;
  }

  async remove(id: number) {
    // Проверяем существование акции
    const promotion = await this.findOne(id);

    // Удаляем акцию
    await this.prisma.promotion.delete({
      where: { id },
    });

    // Откатываем скидки на товары, если акция применялась к конкретным товарам
    if (promotion.targetProducts && Array.isArray(promotion.targetProducts) && promotion.targetProducts.length) {
      await this.resetDiscountsForProducts(promotion.targetProducts as number[]);
    }

    // Откатываем скидки на товары в категориях, если акция применялась к категориям
    if (promotion.targetCategories && Array.isArray(promotion.targetCategories) && promotion.targetCategories.length) {
      await this.resetDiscountsForCategories(promotion.targetCategories as number[]);
    }

    return { message: `Акция с ID ${id} успешно удалена` };
  }

  private async validateCategories(categoryIds: number[]) {
    for (const categoryId of categoryIds) {
      try {
        await this.categoryService.findOne(categoryId);
      } catch (error) {
        throw new BadRequestException(`Категория с ID ${categoryId} не найдена`);
      }
    }
  }

  private async validateProducts(productIds: number[]) {
    for (const productId of productIds) {
      try {
        await this.productService.findOne(productId);
      } catch (error) {
        throw new BadRequestException(`Товар с ID ${productId} не найден`);
      }
    }
  }

  private validateDates(startDate: Date, endDate: Date) {
    if (startDate > endDate) {
      throw new BadRequestException('Дата начала акции должна быть раньше даты окончания');
    }
  }

  private async applyDiscountToProducts(productIds: number[], discountPercentage: number) {
    for (const productId of productIds) {
      try {
        await this.productService.applyDiscount(productId, discountPercentage);
      } catch (error) {
        console.error(`Ошибка при применении скидки к товару ${productId}: ${error.message}`);
      }
    }
  }

  private async applyDiscountToCategories(categoryIds: number[], discountPercentage: number) {
    for (const categoryId of categoryIds) {
      try {
        // Получаем все товары в категории
        const products = await this.productService.findByCategoryId(categoryId);
        
        // Применяем скидку к каждому товару
        for (const product of products) {
          await this.productService.applyDiscount(product.id, discountPercentage);
        }
      } catch (error) {
        console.error(`Ошибка при применении скидки к категории ${categoryId}: ${error.message}`);
      }
    }
  }

  private async resetDiscountsForProducts(productIds: number[]) {
    for (const productId of productIds) {
      try {
        await this.productService.applyDiscount(productId, 0);
      } catch (error) {
        console.error(`Ошибка при сбросе скидки для товара ${productId}: ${error.message}`);
      }
    }
  }

  private async resetDiscountsForCategories(categoryIds: number[]) {
    for (const categoryId of categoryIds) {
      try {
        // Получаем все товары в категории
        const products = await this.productService.findByCategoryId(categoryId);
        
        // Сбрасываем скидку для каждого товара
        for (const product of products) {
          await this.productService.applyDiscount(product.id, 0);
        }
      } catch (error) {
        console.error(`Ошибка при сбросе скидок для категории ${categoryId}: ${error.message}`);
      }
    }
  }

  async seedPromotions() {
    // Получаем категории и товары для создания акций
    const categories = await this.prisma.category.findMany({ select: { id: true } });
    const products = await this.prisma.product.findMany({ select: { id: true } });

    if (categories.length === 0 || products.length === 0) {
      throw new BadRequestException('Нет доступных категорий или товаров для создания акций');
    }

    const promotions = [];

    // Создаем акцию на категорию
    const categoryPromotion = await this.create({
      name: 'Скидка на категорию',
      description: 'Скидка на все товары в категории',
      discountPercentage: 15,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Неделя вперед
      targetCategories: [categories[0].id],
    });
    promotions.push(categoryPromotion);

    // Создаем акцию на конкретные товары
    const selectedProducts = products.slice(0, 3).map(p => p.id);
    const productPromotion = await this.create({
      name: 'Скидка на избранные товары',
      description: 'Скидка 20% на избранные товары',
      discountPercentage: 20,
      startDate: new Date(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 дня вперед
      targetProducts: selectedProducts,
    });
    promotions.push(productPromotion);

    // Создаем будущую акцию
    const futurePromotion = await this.create({
      name: 'Будущая распродажа',
      description: 'Большая распродажа в будущем',
      discountPercentage: 30,
      startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 дней вперед
      endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000), // 17 дней вперед
      targetCategories: [categories[categories.length - 1].id],
    });
    promotions.push(futurePromotion);

    return promotions;
  }
} 