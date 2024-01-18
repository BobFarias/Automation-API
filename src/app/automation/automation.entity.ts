import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Defined the entity mapped to a database table
@Entity()
export class AutomationEntity {
  @PrimaryGeneratedColumn()
  automationId: number;

  @Column()
  name: string;

  @Column()
  environmentId: number;

  @Column({ type: 'float' })
  criticalRatio: number;

  @Column()
  criticality: number;
}
