import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomationModule } from '../../src/app/automation/automation.module';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// Defining the Testing Database Env
const DB_TESTING_CONFIG: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '261196',
  database: 'automation-api-test', // Use the test database
  entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'], // Adjusted path
  synchronize: true,
};

describe('AutomationController (e2e)', () => {
  let app: INestApplication;

  // Defining the Database config on the testingModule
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(DB_TESTING_CONFIG), AutomationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Double checking the database is connected and returing the initial GET
  it('should fetch automations which means that the database connected successfully', async () => {
    await request(app.getHttpServer())
      .get('/automation')
      .expect(200) // Expecting 200 status code
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  // Declaring an empty var to fill the ID of the automation created to be used later to test update and delete
  let automationIdCreated: number;

  // Creating a new automation
  it('should create a new automation', async () => {
    // Mocking the automation Data that will be created
    const mockAutomationData = {
      name: 'Test Automation',
      environmentId: 1,
      criticalRatio: 0.5,
      criticality: 8,
    };

    await request(app.getHttpServer())
      .post('/automation/create')
      .send(mockAutomationData)
      .expect(201) // Expecting 201 status code
      .then((response) => {
        // Updating the var created with the automationID create for this new automation
        automationIdCreated = response.body.automationId;
        // Checking if the automationId is on the body of the response
        expect(response.body).toHaveProperty('automationId');
        // Checking if the name of the response is the same of the mockAutomationData
        expect(response.body.name).toEqual(mockAutomationData.name);
      });
  });

  // Updating the CritialRatio
  it('should update the created automation', async () => {
    const updateData = {
      newCriticalRatio: 1.5, // Need to follow the structure on the controller and service
    };

    await request(app.getHttpServer())
      .put(`/automation/update/critical-ratio/${automationIdCreated}`) // Use the stored ID
      .send(updateData)
      .expect(200) // Expecting 200 status code
      .then((response) => {
        // Need to have the automationIdCreated on the response
        expect(response.body).toHaveProperty(
          'automationId',
          automationIdCreated,
        );
        // Checking if the new updated data is the same on the mock data
        expect(response.body.criticalRatio).toEqual(
          updateData.newCriticalRatio,
        );
      });
  });

  // Delete the created automation the CritialRatio
  it('should delete the created automation', async () => {
    await request(app.getHttpServer())
      .delete(`/automation/delete/${automationIdCreated}`)
      .expect(200) // Expecting 200 status code
      .then((response) => {
        // Return a confirmation message or an empty response.
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('successfully deleted');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
