/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

// 1. Create a mock repository object
// We use vi.fn() to create mock functions
const mockRepository = {
  create: vi.fn(),
  findAll: vi.fn(),
  findOne: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
};

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: CustomerRepository;

  beforeEach(async () => {
    // 2. Create a NestJS testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository, // Provide the real repository token
          useValue: mockRepository, // Use our mock object as the value
        },
      ],
    }).compile();

    // 3. Get the service and mock repository from the module
    service = module.get<CustomerService>(CustomerService);
    repository = module.get<CustomerRepository>(CustomerRepository);

    // 4. Reset all mock function calls before each test
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- Test for create() ---
  it('should create a customer', async () => {
    // Arrange
    const createDto: CreateCustomerDto = {
      email: 'test@example.com',
      firstName: 'Test',
    };
    const expectedCustomer = {
      id: 1,
      ...createDto,
      lastName: null,
      phone: null,
      companyName: null,
      address: null,
      city: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock the repository's create method
    mockRepository.create.mockResolvedValue(expectedCustomer);

    // Act
    const result = await service.create(createDto);

    // Assert
    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(result).toEqual(expectedCustomer);
  });

  // --- Test for findAll() ---
  it('should find all customers', async () => {
    // Arrange
    const expectedCustomers = [
      { id: 1, email: 'test1@example.com' },
      { id: 2, email: 'test2@example.com' },
    ];
    mockRepository.findAll.mockResolvedValue(expectedCustomers);

    // Act
    const result = await service.findAll();

    // Assert
    expect(repository.findAll).toHaveBeenCalled();
    expect(result).toEqual(expectedCustomers);
  });

  // --- Test for findOne() ---
  it('should find one customer by id', async () => {
    // Arrange
    const id = 1;
    const expectedCustomer = { id: 1, email: 'test1@example.com' };
    mockRepository.findOne.mockResolvedValue(expectedCustomer);

    // Act
    const result = await service.findOne(id);

    // Assert
    expect(repository.findOne).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedCustomer);
  });

  // --- Test for update() ---
  it('should update a customer', async () => {
    // Arrange
    const id = 1;
    const updateDto: UpdateCustomerDto = { firstName: 'Updated' };
    const expectedCustomer = {
      id: 1,
      email: 'test1@example.com',
      ...updateDto,
    };
    mockRepository.update.mockResolvedValue(expectedCustomer);

    // Act
    const result = await service.update(id, updateDto);

    // Assert
    expect(repository.update).toHaveBeenCalledWith(id, updateDto);
    expect(result).toEqual(expectedCustomer);
  });

  // --- Test for remove() ---
  it('should remove a customer', async () => {
    // Arrange
    const id = 1;
    const expectedCustomer = { id: 1, email: 'test1@example.com' };
    mockRepository.remove.mockResolvedValue(expectedCustomer);

    // Act
    const result = await service.remove(id);

    // Assert
    expect(repository.remove).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedCustomer);
  });
});
