import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    // Преобразуем объекты в JSON для хранения в БД
    return this.prisma.customer.create({
      data: {
        profiles: createCustomerDto.profiles as any,
        budget: createCustomerDto.budget,
        preferences: createCustomerDto.preferences as any,
        visitFrequency: createCustomerDto.visitFrequency || 1.0,
      },
    });
  }

  async findAll() {
    return this.prisma.customer.findMany();
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        purchases: {
          include: {
            product: true,
          },
        },
        queueEvents: true,
        checkoutEvents: true,
      },
    });

    if (!customer) {
      throw new NotFoundException(`Покупатель с ID ${id} не найден`);
    }

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      // Находим покупателя перед обновлением
      await this.findOne(id);

      // Формируем данные для обновления
      const updateData: any = {};

      if (updateCustomerDto.profiles) {
        updateData.profiles = updateCustomerDto.profiles as any;
      }

      if (updateCustomerDto.budget !== undefined) {
        updateData.budget = updateCustomerDto.budget;
      }

      if (updateCustomerDto.preferences) {
        updateData.preferences = updateCustomerDto.preferences as any;
      }

      if (updateCustomerDto.visitFrequency !== undefined) {
        updateData.visitFrequency = updateCustomerDto.visitFrequency;
      }

      return this.prisma.customer.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Ошибка при обновлении покупателя: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      // Находим покупателя перед удалением
      await this.findOne(id);

      return this.prisma.customer.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Ошибка при удалении покупателя: ${error.message}`);
    }
  }

  async generateRandomCustomers(count: number = 30) {
    // Получаем все категории для создания предпочтений
    const categories = await this.prisma.category.findMany({ select: { id: true } });
    
    if (categories.length === 0) {
      throw new BadRequestException('Нет доступных категорий товаров для генерации предпочтений');
    }

    const customers = [];

    // Профили покупателей для генерации
    const possibleProfiles = [
      { name: 'любит скидки', factor: 0.9 },
      { name: 'покупает электронику', factor: 0.7 },
      { name: 'экономный покупатель', factor: 0.8 },
      { name: 'импульсивный покупатель', factor: 0.6 },
      { name: 'любитель новинок', factor: 0.7 },
      { name: 'верный бренду', factor: 0.8 },
      { name: 'исследует все варианты', factor: 0.5 },
      { name: 'покупает продукты питания', factor: 0.9 },
      { name: 'покупает только необходимое', factor: 0.7 },
      { name: 'любит покупать технику', factor: 0.6 },
    ];

    for (let i = 0; i < count; i++) {
      // Создаем случайные профили для покупателя (1-3 профиля)
      const profileCount = Math.floor(Math.random() * 3) + 1;
      const customerProfiles = [];
      
      // Выбираем случайные профили без повторений
      const shuffledProfiles = [...possibleProfiles].sort(() => 0.5 - Math.random());
      for (let j = 0; j < profileCount; j++) {
        if (j < shuffledProfiles.length) {
          const profile = shuffledProfiles[j];
          // Добавляем небольшую вариацию к коэффициенту
          const factorVariation = (Math.random() * 0.2) - 0.1; // -0.1 до +0.1
          const adjustedFactor = Math.max(0, Math.min(1, profile.factor + factorVariation));
          
          customerProfiles.push({
            name: profile.name,
            factor: parseFloat(adjustedFactor.toFixed(2)),
          });
        }
      }

      // Создаем случайные предпочтения по категориям
      const customerPreferences = [];
      for (const category of categories) {
        // Для каждой категории генерируем случайный коэффициент предпочтения
        const preference = parseFloat((Math.random() * 0.9 + 0.1).toFixed(2)); // 0.1 до 1.0
        customerPreferences.push({
          categoryId: category.id,
          preference,
        });
      }

      // Создаем покупателя с случайным бюджетом и частотой посещений
      const budget = Math.floor(Math.random() * 10000) + 5000; // Бюджет от 5000 до 15000
      const visitFrequency = parseFloat((Math.random() * 2 + 0.5).toFixed(1)); // Частота от 0.5 до 2.5 раз в неделю

      try {
        const customer = await this.create({
          profiles: customerProfiles,
          budget,
          preferences: customerPreferences,
          visitFrequency,
        });
        customers.push(customer);
      } catch (error) {
        console.error(`Ошибка при создании покупателя #${i + 1}: ${error.message}`);
      }
    }

    return customers;
  }
} 