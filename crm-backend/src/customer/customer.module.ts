import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository'; // 1. Import

@Module({
  controllers: [CustomerController],
  // 2. Add CustomerRepository to providers
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
