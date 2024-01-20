import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// Default automation to check if it the services will create the record
export const MOCK_AUTOMATION = {
  automationId: 1,
  name: 'Test Automation',
  environmentId: 1,
  criticalRatio: 0.5,
  criticality: 0.3,
};

export interface IAutomationDTO {
  automationId: number;
  name: string;
  environmentId: number;
  criticalRatio: number;
  criticality: number;
}

export class CreateAutomationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Example Automation',
    description: 'The name of the automation',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The ID of the environment.',
  })
  environmentId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 0.75,
    description:
      'A decimal number define when creating the automation an defines how critical the automation is',
  })
  criticalRatio: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 8,
    description:
      'An integer to give a more visual representation of the critical ratio.',
  })
  criticality: number;
}
