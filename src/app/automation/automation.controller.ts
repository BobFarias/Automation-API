import {
  Post,
  Body,
  Param,
  Controller,
  HttpStatus,
  HttpException,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AutomationService } from './automation/automation.service';
import {
  CreateAutomationDto,
  UpdateCriticalRatioDto,
  MOCK_AUTOMATION,
} from './automation/automation.dto';
import { AutomationEntity } from './automation.entity';

import { IdValidation } from 'src/common/decorators/id-validation.param.decorator';

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
  @ApiResponse({ status: 400, description: 'Error creating automation.' })
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
  // Promise of a string with a sucessful message or a void throwing an error
  // Using a specific Decorator to handle the validation of the ID received as a parameter
  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete a specific automation' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the automation',
  })
  @ApiResponse({
    status: 200,
    description: 'The automation has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async deleteAutomation(
    @IdValidation('id') automationId: string,
  ): Promise<void | { message: string }> {
    // Checking if automationId is a valid number
    const id = Number(automationId);
    return await this.automationService.delete(id);
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
