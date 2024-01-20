import { Test, TestingModule } from '@nestjs/testing';
import { AutomationService } from './automation.service';
import { AutomationEntity } from '../automation.entity';

// Repository and getRepositoryToken used to create the mockRepository
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MOCK_AUTOMATION } from './automation.dto';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creating a new automation record', async () => {
    // Simulating database interactions without actually hitting the database
    // Calling the 'create' method and returing MOCK_AUTOMATION to simulate the creation of this entity
    jest
      .spyOn(mockRepository, 'create')
      .mockImplementation(() => MOCK_AUTOMATION);
    // Simulating the saving process
    jest.spyOn(mockRepository, 'save').mockResolvedValue(MOCK_AUTOMATION);

    // Expecting to have the output as the body used on the createAutomation service function.
    expect(await service.create(MOCK_AUTOMATION)).toEqual(MOCK_AUTOMATION);

    // Making sure that the create/save used the MOCK_AUTOMATION as body on their calls
    expect(mockRepository.create).toHaveBeenCalledWith(MOCK_AUTOMATION);
    expect(mockRepository.save).toHaveBeenCalledWith(MOCK_AUTOMATION);
  });
});
