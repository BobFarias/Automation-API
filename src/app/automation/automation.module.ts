import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AutomationController } from './automation.controller';
import { AutomationService } from './automation/automation.service';
import { AutomationEntity } from './automation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AutomationEntity])],
  controllers: [AutomationController],
  providers: [AutomationService],
})
export class AutomationModule {}
