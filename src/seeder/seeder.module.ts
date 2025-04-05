import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';
import { CustomerModule } from '../customer/customer.module';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  imports: [PrismaModule, CategoryModule, ProductModule, CustomerModule],
  controllers: [SeederController],
  providers: [SeederService, PrismaService],
})
export class SeederModule {} 