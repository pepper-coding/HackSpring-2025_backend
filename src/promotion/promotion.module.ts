import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
@Module({
  imports: [PrismaModule, CategoryModule, ProductModule],
  controllers: [PromotionController],
  providers: [PromotionService, PrismaService],
  exports: [PromotionService],
})
export class PromotionModule {} 