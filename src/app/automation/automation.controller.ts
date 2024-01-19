import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AutomationService } from './automation/automation.service';
import { CreateAutomationDto } from './automation/automation.dto';
import { AutomationEntity } from './automation.entity';

@ApiTags('automations')
@Controller('automation')
export class AutomationController {
  constructor(private automationService: AutomationService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new automation' })
  @ApiResponse({
    status: 201,
    description: 'The automation has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createAutomation(
    @Body() body: CreateAutomationDto,
  ): Promise<AutomationEntity> {
    const result = await this.automationService.createAutomation(body);
    if (!result) {
      throw new BadRequestException('Invalid input data');
    }
    return result;
  }
}
