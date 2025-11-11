/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  // Inject the repository instead of Prisma
  constructor(private repository: CustomerRepository) {}

  create(createCustomerDto: CreateCustomerDto) {
    // Delegate the database call to the repository
    return this.repository.create(createCustomerDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.repository.update(id, updateCustomerDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
