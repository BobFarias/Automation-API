import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutomationModule } from './app/automation/automation.module';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const CONFIG_DATABASE: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '261196',
  database: 'automation-api-db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(CONFIG_DATABASE), AutomationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
