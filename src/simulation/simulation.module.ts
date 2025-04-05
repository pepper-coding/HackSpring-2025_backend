import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StoreModule } from '../store/store.module';
import { CustomerModule } from '../customer/customer.module';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';
import { CashierModule } from '../cashier/cashier.module';
import { PromotionModule } from '../promotion/promotion.module';
import { ShelfModule } from '../shelf/shelf.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { SimulationController } from './simulation.controller';
import { SimulationService } from './simulation.service';
import { StoreService } from '../store/store.service';
import { CustomerService } from '../customer/customer.service';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category/category.service';
import { CashierService } from '../cashier/cashier.service';
import { PromotionService } from '../promotion/promotion.service';
import { ShelfService } from '../shelf/shelf.service';

@Module({
  imports: [
    PrismaModule,
    StoreModule,
    CustomerModule,
    ProductModule,
    CategoryModule,
    CashierModule,
    PromotionModule,
    ShelfModule
  ],
  controllers: [SimulationController],
  providers: [
    SimulationService, 
    PrismaService, 
    StoreService, 
    CustomerService, 
    ProductService, 
    CategoryService, 
    CashierService, 
    PromotionService,
    ShelfService
  ],
  exports: [SimulationService],
})
export class SimulationModule {} 