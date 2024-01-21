import { Test, TestingModule } from '@nestjs/testing';
import { AutomationController } from './automation.controller';
import { AutomationService } from './automation/automation.service';

import { MOCK_AUTOMATION } from './automation/automation.dto';

describe('AutomationController', () => {
  let controller: AutomationController;
  let mockAutomationService: Partial<jest.Mocked<AutomationService>>;

  beforeEach(async () => {
    // Making sure that all the tests wont be affected by another.
    jest.clearAllMocks();

    mockAutomationService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomationController],
      providers: [
        {
          provide: AutomationService,
          useValue: mockAutomationService,
        },
      ],
    }).compile();

    controller = module.get<AutomationController>(AutomationController);
  });

  // Default testing to ensure that controller and service are defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockAutomationService).toBeDefined();
  });

  it('should create an automation and return it', async () => {
    // Setting up the service to return a mocked value
    mockAutomationService.create.mockResolvedValue(MOCK_AUTOMATION);

    // Making the request with controller functions (createAutomation)
    const createAutomationResponse = await controller.createAutomation(
      MOCK_AUTOMATION,
    );

    // Getting the body of request on the createAutomation service function to test if matches with MOCK_AUTOMATION.
    expect(mockAutomationService.create).toHaveBeenCalledWith(MOCK_AUTOMATION);
    // Checking if the result is the same on the body request
    expect(createAutomationResponse).toEqual(MOCK_AUTOMATION);
  });

  // Testing the erros with the service's functions
  it('should handle with errors related to the automation services functs', async () => {
    const errorMessage = 'Error creating automation';

    mockAutomationService.create.mockRejectedValue(new Error(errorMessage));

    await expect(controller.createAutomation(MOCK_AUTOMATION)).rejects.toThrow(
      errorMessage,
    );
  });

  it('should delete an automation', async () => {
    // Receiving a string due to the path used on the api request
    const automationId = '1';
    // Setting up the service to delete an automation
    mockAutomationService.delete.mockResolvedValue();

    // Making the request using the deleteAutomation controller function
    // Expecting not throw any error
    await expect(
      controller.deleteAutomation(automationId),
    ).resolves.not.toThrow();

    // Expecting to have the automation ID called on the delete function in service file
    // Converting the string to a number
    expect(mockAutomationService.delete).toHaveBeenCalledWith(
      Number(automationId),
    );
  });

  it('should update the critical ratio of a specific automation', async () => {
    // Mocking values that will be used for the test
    // Getting the ID as a string because of the PATH from the api request
    const automationId = '1';
    // Matching the MockData with the UpdateCriticalRatioDto
    const newCriticalRatio = { newCriticalRatio: 1.5 };
    const updatedAutomation = {
      ...MOCK_AUTOMATION,
      criticalRatio: Number(newCriticalRatio.newCriticalRatio),
    };

    // Setting up the service to update an automation
    mockAutomationService.updateCriticalRatio.mockResolvedValue(
      updatedAutomation,
    );

    // Making the request using the updateAutomation controller function
    const result = await controller.updateAutomationCriticalRatio(
      automationId,
      newCriticalRatio,
    );

    // The result from the previous request needs to be the same of the const "updatedAutomation"
    expect(result).toEqual(updatedAutomation);

    // Making sure that the automation ID and the new critical ration have been called
    expect(mockAutomationService.updateCriticalRatio).toHaveBeenCalledWith(
      Number(automationId),
      updatedAutomation.criticalRatio,
    );
  });
});