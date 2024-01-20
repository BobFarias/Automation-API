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
    mockAutomationService.create.mockResolvedValue(MOCK_AUTOMATION);

    const createAutomationResponse = await controller.createAutomation(
      MOCK_AUTOMATION,
    );

    // Getting the body of request on the createAutomation service function to test if matches with MOCK_AUTOMATION.
    expect(mockAutomationService.create).toHaveBeenCalledWith(MOCK_AUTOMATION);
    // Checking if the result is the same on the body request
    expect(createAutomationResponse).toEqual(MOCK_AUTOMATION);
  });

  it('should handle with errors related to the automation services functs', async () => {
    const errorMessage = 'Bad request';

    mockAutomationService.create.mockRejectedValue(new Error(errorMessage));

    await expect(controller.createAutomation(MOCK_AUTOMATION)).rejects.toThrow(
      errorMessage,
    );
  });
});
