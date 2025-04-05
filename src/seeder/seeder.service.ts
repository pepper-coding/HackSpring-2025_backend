import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private customerService: CustomerService,
  ) {}

  async seedCategories() {
    this.logger.log('Начинаем загрузку категорий...');

    const categories = [
      { name: 'Электроника', description: 'Компьютеры, смартфоны, гаджеты' },
      { name: 'Продукты питания', description: 'Еда и напитки' },
      { name: 'Одежда', description: 'Мужская и женская одежда' },
      { name: 'Бытовая техника', description: 'Техника для дома' },
      { name: 'Косметика', description: 'Средства для ухода и красоты' },
      { name: 'Канцтовары', description: 'Офисные принадлежности' },
      { name: 'Товары для дома', description: 'Предметы интерьера и быта' },
      { name: 'Спортивные товары', description: 'Инвентарь и одежда для спорта' },
    ];

    const createdCategories = [];

    for (const category of categories) {
      try {
        const createdCategory = await this.categoryService.create(category);
        createdCategories.push(createdCategory);
        this.logger.log(`Категория "${category.name}" успешно создана`);
      } catch (error) {
        this.logger.error(`Ошибка при создании категории "${category.name}": ${error.message}`);
      }
    }

    this.logger.log(`Загрузка категорий завершена. Создано ${createdCategories.length} категорий.`);
    return createdCategories;
  }

  async seedProducts() {
    this.logger.log('Начинаем загрузку товаров...');

    // Получаем все категории
    const categories = await this.categoryService.findAll();
    if (categories.length === 0) {
      this.logger.error('Нет доступных категорий. Сначала создайте категории.');
      return [];
    }

    // Создаем базу товаров по категориям
    const productsByCategory = {
      'Электроника': [
        { name: 'Смартфон X20', price: 49999.99, popularity: 9.2 },
        { name: 'Ноутбук ProBook', price: 79999.99, popularity: 8.7 },
        { name: 'Наушники BassSound', price: 5999.99, popularity: 7.8 },
        { name: 'Планшет TabPro', price: 39999.99, popularity: 6.9 },
        { name: 'Умные часы SmartTime', price: 12999.99, popularity: 8.3 },
      ],
      'Продукты питания': [
        { name: 'Хлеб белый', price: 49.99, popularity: 9.5 },
        { name: 'Молоко 3.2%', price: 89.99, popularity: 9.4 },
        { name: 'Сыр Российский', price: 499.99, popularity: 8.1 },
        { name: 'Колбаса вареная', price: 349.99, popularity: 7.9 },
        { name: 'Шоколад темный', price: 129.99, popularity: 8.8 },
      ],
      'Одежда': [
        { name: 'Футболка мужская', price: 999.99, popularity: 7.2 },
        { name: 'Джинсы женские', price: 2999.99, popularity: 8.3 },
        { name: 'Куртка зимняя', price: 7999.99, popularity: 6.8 },
        { name: 'Платье вечернее', price: 5999.99, popularity: 5.4 },
        { name: 'Носки спортивные', price: 299.99, popularity: 9.1 },
      ],
      'Бытовая техника': [
        { name: 'Стиральная машина', price: 29999.99, popularity: 7.7 },
        { name: 'Холодильник двухкамерный', price: 49999.99, popularity: 8.5 },
        { name: 'Микроволновая печь', price: 7999.99, popularity: 9.0 },
        { name: 'Пылесос автоматический', price: 19999.99, popularity: 7.2 },
        { name: 'Кофемашина', price: 39999.99, popularity: 6.5 },
      ],
    };

    const createdProducts = [];

    // Для каждой категории создаем товары
    for (const category of categories) {
      const products = productsByCategory[category.name];
      if (!products) continue;

      for (const product of products) {
        try {
          const createdProduct = await this.productService.create({
            ...product,
            categoryId: category.id,
            discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) : 0, // 30% товаров со скидкой до 30%
          });
          createdProducts.push(createdProduct);
          this.logger.log(`Товар "${product.name}" успешно создан в категории "${category.name}"`);
        } catch (error) {
          this.logger.error(`Ошибка при создании товара "${product.name}": ${error.message}`);
        }
      }
    }

    this.logger.log(`Загрузка товаров завершена. Создано ${createdProducts.length} товаров.`);
    return createdProducts;
  }

  async seedCustomers(count: number = 30) {
    this.logger.log(`Начинаем создание ${count} тестовых покупателей...`);
    
    try {
      const customers = await this.customerService.generateRandomCustomers(count);
      this.logger.log(`Создание покупателей завершено. Создано ${customers.length} покупателей.`);
      return customers;
    } catch (error) {
      this.logger.error(`Ошибка при создании покупателей: ${error.message}`);
      return [];
    }
  }

  async clearData() {
    this.logger.log('Очистка данных...');

    // Удаляем покупки
    try {
      await this.prisma.purchase.deleteMany();
      this.logger.log('Все покупки удалены');
    } catch (error) {
      this.logger.error(`Ошибка при удалении покупок: ${error.message}`);
    }

    // Удаляем движения покупателей
    try {
      await this.prisma.customerMovement.deleteMany();
      this.logger.log('Все движения покупателей удалены');
    } catch (error) {
      this.logger.error(`Ошибка при удалении движений покупателей: ${error.message}`);
    }

    // Удаляем очереди
    try {
      await this.prisma.queue.deleteMany();
      this.logger.log('Все очереди удалены');
    } catch (error) {
      this.logger.error(`Ошибка при удалении очередей: ${error.message}`);
    }

    // Удаляем расчеты на кассе
    try {
      await this.prisma.checkout.deleteMany();
      this.logger.log('Все расчеты на кассе удалены');
    } catch (error) {
      this.logger.error(`Ошибка при удалении расчетов на кассе: ${error.message}`);
    }

    // Удаляем покупателей
    try {
      await this.prisma.customer.deleteMany();
      this.logger.log('Все покупатели удалены');
    } catch (error) {
      this.logger.error(`Ошибка при удалении покупателей: ${error.message}`);
    }

    // Удаляем акции
    try {
      await this.prisma.promotion.deleteMany();
      this.logger.log('Все акции удалены');
    } catch (error) {
      this.logger.error(`Ошибка при удалении акций: ${error.message}`);
    }

    // Удаляем события в магазине
    try {
      await this.prisma.storeEvent.deleteMany();
      this.logger.log('Все события удалены');
    } catch (error) {
      this.logger.error(`Ошибка при удалении событий: ${error.message}`);
    }

    // Удаляем товары
    try {
      await this.prisma.product.deleteMany();
      this.logger.log('Все товары удалены');
    } catch (error) {
      this.logger.error(`Ошибка при удалении товаров: ${error.message}`);
    }

    // Удаляем категории
    try {
      await this.prisma.category.deleteMany();
      this.logger.log('Все категории удалены');
    } catch (error) {
      this.logger.error(`Ошибка при удалении категорий: ${error.message}`);
    }

    this.logger.log('Очистка данных завершена');
    return { message: 'Данные успешно очищены' };
  }

  async seedAll() {
    this.logger.log('Начинаем полную загрузку тестовых данных...');
    
    await this.clearData();
    await this.seedCategories();
    const products = await this.seedProducts();
    const customers = await this.seedCustomers();
    
    return { 
      message: 'Тестовые данные успешно загружены',
      stats: {
        products: products.length,
        customers: customers.length,
      }
    };
  }
} 