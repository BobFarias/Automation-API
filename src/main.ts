import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// SwaggerModule and DocumentBuilder are used for setting up Swagger (OpenAPI) documentation.
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration for the Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Automation API')
    .setDescription('The automation API description')
    .setVersion('1.0')
    .build();

  // Generating documentation with  the application and the configuration
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  // Enable automatic validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
