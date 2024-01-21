import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AutomationEntity } from '../automation.entity';
import { CreateAutomationDto, QueryOptions } from './automation.dto';

@Injectable()
export class AutomationService {
  constructor(
    @InjectRepository(AutomationEntity)
    private automationRepository: Repository<AutomationEntity>,
  ) {}

  async findAll(queries?: QueryOptions): Promise<AutomationEntity[] | null> {
    const { sort, environmentId } = queries;
    let formattedSort: 'ASC' | 'DESC';

    // Formatting to the correct sorting
    if (sort === 'asc' || sort === null || sort === undefined)
      formattedSort = 'ASC';
    if (sort === 'desc') formattedSort = 'DESC';

    return this.automationRepository.find({
      order: { automationId: formattedSort },
    });
  }

  // Creating a new automation record
  async create(
    createAutomationDto: CreateAutomationDto,
  ): Promise<AutomationEntity> {
    // Taking the DTO, maps it to an entity, and saves it to the database
    const automation = this.automationRepository.create(createAutomationDto);
    return this.automationRepository.save(automation);
  }

  // Deleting a specific automation record
  async delete(automationId: number): Promise<void | { message: string }> {
    // Deleting the automation with the valid ID received
    const result = await this.automationRepository.delete(automationId);

    // Checking if any data was affected by the delete function
    // Throwing an error if nothing was found with the ID requested
    if (result.affected === 0) {
      throw new NotFoundException(
        `Automation with ID ${automationId} not found`,
      );
    }

    // Returning a sucessful message if the data was deleted
    return {
      message: `Automation with ID ${automationId} successfully deleted`,
    };
  }

  // Updating the critical ratio of a specific
  async updateCriticalRatio(
    automationId: number,
    criticalRatio: number,
  ): Promise<AutomationEntity> {
    // Finding the automation with the specific ID provided
    const automation = await this.automationRepository.findOne({
      where: { automationId: automationId },
    });

    // Throwing an error if there is no data with a valid ID value
    if (!automation) {
      throw new NotFoundException(
        `Automation with ID ${automationId} not found`,
      );
    }

    // Updating the automation data
    automation.criticalRatio = criticalRatio;

    // Saving the new updated automation
    return this.automationRepository.save(automation);
  }
}
