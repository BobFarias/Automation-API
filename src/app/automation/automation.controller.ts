import {
  Post,
  Body,
  Param,
  Controller,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AutomationService } from './automation/automation.service';
import {
  CreateAutomationDto,
  UpdateCriticalRatioDto,
  MOCK_AUTOMATION,
} from './automation/automation.dto';
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
    try {
      return await this.automationService.create(body);
    } catch (error) {
      throw new HttpException(
        'Error creating automation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // HTTP Request to delete an automation
  async deleteAutomation(@Param('id') automationId: string): Promise<void> {
    return;
  }

  // HTTP Request to update a critical Ratio based on specific ID
  async updateAutomationCriticalRatio(
    @Param('id') automationId: string,
    @Body() updateDto: UpdateCriticalRatioDto,
  ): Promise<AutomationEntity> {
    try {
      return MOCK_AUTOMATION;
    } catch (error) {
      throw new HttpException(
        'Error creating automation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
