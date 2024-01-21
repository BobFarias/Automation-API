import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AutomationEntity } from '../automation.entity';
import { CreateAutomationDto, MOCK_AUTOMATION } from './automation.dto';

@Injectable()
export class AutomationService {
  constructor(
    @InjectRepository(AutomationEntity)
    private automationRepository: Repository<AutomationEntity>,
  ) {}

  // Creating a new automation record
  async create(
    createAutomationDto: CreateAutomationDto,
  ): Promise<AutomationEntity> {
    // Taking the DTO, maps it to an entity, and saves it to the database
    const automation = this.automationRepository.create(createAutomationDto);
    return this.automationRepository.save(automation);
  }

  // Deleting a specific automation record
  async delete(automationId: number): Promise<void> {
    return;
  }

  // Updating the critical ratio of a specific automation
  async updateCriticalRatio(
    automationId: number,
    criticalRatio: number,
  ): Promise<AutomationEntity> {
    return MOCK_AUTOMATION;
  }
}
