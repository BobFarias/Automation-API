import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AutomationEntity } from '../automation.entity';
import { CreateAutomationDto } from './automation.dto';

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
}
