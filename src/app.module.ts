import { Module } from '@nestjs/common';
import { StoreModule } from './store/store.module';
import { SectionModule } from './section/section.module';
import { ShelfModule } from './shelf/shelf.module';
import { CashierModule } from './cashier/cashier.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { SeederModule } from './seeder/seeder.module';
import { CustomerModule } from './customer/customer.module';
import { PromotionModule } from './promotion/promotion.module';
import { SimulationModule } from './simulation/simulation.module';

@Module({
  imports: [
    StoreModule, 
    SectionModule, 
    ShelfModule, 
    CashierModule, 
    CategoryModule,
    ProductModule,
    SeederModule,
    CustomerModule,
    PromotionModule,
    SimulationModule
  ],
})
export class AppModule {}
