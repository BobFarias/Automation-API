import {
  Get,
  Put,
  Body,
  Post,
  Query,
  Delete,
  HttpStatus,
  Controller,
  HttpException,
} from '@nestjs/common';

import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AutomationService } from './automation/automation.service';
import {
  CreateAutomationDto,
  QueryOptions,
  UpdateCriticalRatioDto,
} from './automation/automation.dto';
import { AutomationEntity } from './automation.entity';

import { IdValidation } from '../../common/decorators/id-validation.param.decorator';

@ApiTags('automations')
@Controller('automation')
export class AutomationController {
  constructor(private automationService: AutomationService) {}

  // HTTP Request to GET an list of automations based on order and env ID
  @Get()
  @ApiOperation({ summary: 'Get all the automations. Queries could be used.' })
  @ApiResponse({
    status: 200,
    description: 'List of automations available.',
  })
  @ApiResponse({ status: 400, description: 'Error fetching the automations.' })
  async findAll(@Query() query?: QueryOptions): Promise<AutomationEntity[]> {
    // if the user does not choice any query, it will return an empty object
    // Validation of this empty object will be done on the service side
    return await this.automationService.findAll(query);
  }

  // HTTP Request to POST to create a new automation
  // Body necessary according to the CreateAutomationDto.
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
  @Put('/update/critical-ratio/:id')
  @ApiOperation({
    summary: 'Update the critical ratio of a specific automation',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the automation',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateAutomationCriticalRatio(
    @IdValidation('id') automationId: string,
    @Body() updateDto: UpdateCriticalRatioDto,
  ): Promise<AutomationEntity> {
    try {
      return this.automationService.updateCriticalRatio(
        Number(automationId),
        updateDto.newCriticalRatio,
      );
    } catch (error) {
      throw new HttpException(
        'Error updating automation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
