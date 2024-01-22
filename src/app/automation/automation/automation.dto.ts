import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// Default automation to check if it the services will create the record
export const MOCK_AUTOMATION = {
  automationId: 1,
  name: 'Test Automation',
  environmentId: 1,
  criticalRatio: 0.5,
  criticality: 8,
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

export class UpdateCriticalRatioDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description:
      'Please provide the new critical ratio value (float number) that will be used to update.',
  })
  newCriticalRatio: number;
}

export class QueryOptions {
  @IsString()
  @IsIn(['asc', 'desc'])
  @IsOptional()
  @ApiProperty({
    enum: ['asc', 'desc'],
    required: false,
    description: 'Sort order',
  })
  sort?: string;

  @IsNumber()
  @IsOptional()
  // Used to parseInt the number received from the query
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty({
    type: Number,
    required: false,
    description: 'Filter by automation environment ID',
  })
  environmentId?: number;
}
