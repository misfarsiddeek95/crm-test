/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe, // Import this for type-safe ID parsing
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer') // Sets the base route to /customer
export class CustomerController {
  // 1. Inject the CustomerService
  constructor(private readonly customerService: CustomerService) {}

  // POST /customer
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  // GET /customer
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  // GET /customer/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // We use ParseIntPipe to automatically convert and validate the ID
    return this.customerService.findOne(id);
  }

  // PATCH /customer/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  // DELETE /customer/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }
}
