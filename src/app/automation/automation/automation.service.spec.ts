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
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
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

  it('should return an array of automations in asc ordering', async () => {
    // Mocking the final result of a automations lists asc order
    const mockListAutomations = [
      { ...MOCK_AUTOMATION },
      { ...MOCK_AUTOMATION, idAutomation: 2 },
      { ...MOCK_AUTOMATION, idAutomation: 3 },
    ];

    // Mocking the final result
    jest.spyOn(mockRepository, 'find').mockResolvedValue(mockListAutomations);

    // Calling the service funtion findAll with asc as parameter
    const resultAsc = await service.findAll('asc');

    // Expecting to get the same result as the mockListAutomations
    expect(resultAsc).toEqual(mockListAutomations);

    // Making sure that the sort: ASC have been called
    expect(mockRepository.find).toHaveBeenCalledWith({
      sort: 'ASC',
    });
  });

  it('should return an array of automations in desc ordering', async () => {
    // Mocking the final result of a automations lists asc order
    const mockListAutomations = [
      { ...MOCK_AUTOMATION, idAutomation: 3 },
      { ...MOCK_AUTOMATION, idAutomation: 2 },
      { ...MOCK_AUTOMATION },
    ];

    // Mocking the final result
    jest.spyOn(mockRepository, 'find').mockResolvedValue(mockListAutomations);

    // Calling the service funtion findAll with asc as parameter
    const resultAsc = await service.findAll('desc');

    // Expecting to get the same result as the mockListAutomations
    expect(resultAsc).toEqual(mockListAutomations);

    // Making sure that the sort: ASC have been called
    expect(mockRepository.find).toHaveBeenCalledWith({
      sort: 'DESC',
    });
  });

  it('should create a new automation record', async () => {
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

  it('should delete an automation record', async () => {
    // Mocking the ID that will be used on this test
    const automationId = 1;

    // Mocking the delete function
    jest
      .spyOn(mockRepository, 'delete')
      .mockResolvedValue({ affected: 1, raw: {} });

    // Calling the delete function from the service
    // Checking that it did not resolve by throwing an error
    await expect(service.delete(automationId)).resolves.not.toThrow();

    // Testing with the correct ID has been called on the delete function
    expect(mockRepository.delete).toHaveBeenCalledWith(automationId);
  });

  it('should update an automation record with a new critical ratio', async () => {
    // Mocking values that will be used for the test
    const automationId = 1;
    const newCriticalRatio = 1.5;
    const updatedAutomation = {
      ...MOCK_AUTOMATION,
      criticalRatio: newCriticalRatio,
    };

    // Mocking finding the automation and saving an updated version with a new critical ratio value
    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(MOCK_AUTOMATION);
    jest.spyOn(mockRepository, 'save').mockResolvedValue(updatedAutomation);

    // Calling the update function from the service file
    const result = await service.updateCriticalRatio(
      automationId,
      newCriticalRatio,
    );

    // Checking if the automation has the new critical ratio value
    expect(result.criticalRatio).toBe(newCriticalRatio);

    // Checking if the correct ID was called to be updated
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { automationId: automationId },
    });

    // Making sure that the updated automation saved
    expect(mockRepository.save).toHaveBeenCalledWith(updatedAutomation);
  });
});
