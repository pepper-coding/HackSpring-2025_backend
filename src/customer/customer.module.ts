import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService],
  exports: [CustomerService],
})
export class CustomerModule {} 