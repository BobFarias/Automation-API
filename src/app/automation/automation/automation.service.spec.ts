import { Test, TestingModule } from '@nestjs/testing';
import { AutomationService } from './automation.service';
import { AutomationEntity } from '../automation.entity';

// Repository and getRepositoryToken used to create the mockRepository
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

// Default automation to check if it the services will create the record
const DEFAULT_AUTOMATION = {
  automationId: 1,
  name: 'Test Automation',
  environmentId: 1,
  criticalRatio: 0.5,
  criticality: 0.3,
};

describe('AutomationService', () => {
  let service: AutomationService;
  let mockRepository: Repository<AutomationEntity>;

  //  Sets up the test environment before each test.
  beforeEach(async () => {
    // Creates a testing module that mimics the NestJS module structure.
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutomationService,
        {
          provide: getRepositoryToken(AutomationEntity),
          useValue: {
            // Mock implementation of the repository methods.
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    // Initializes the service and mockRepository with the injected values from the testing module.
    service = module.get<AutomationService>(AutomationService);
    mockRepository = module.get<Repository<AutomationEntity>>(
      getRepositoryToken(AutomationEntity),
    );
  });

  it('should create a new automation record', async () => {
    jest
      .spyOn(mockRepository, 'create')
      .mockImplementation(() => DEFAULT_AUTOMATION);
    jest.spyOn(mockRepository, 'save').mockResolvedValue(DEFAULT_AUTOMATION);

    expect(await service.create(DEFAULT_AUTOMATION)).toEqual(
      DEFAULT_AUTOMATION,
    );
    expect(mockRepository.create).toHaveBeenCalledWith(DEFAULT_AUTOMATION);
    expect(mockRepository.save).toHaveBeenCalledWith(DEFAULT_AUTOMATION);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
